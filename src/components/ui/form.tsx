"use client";

/**
 * Composes reusable React Hook Form field primitives with consistent markup and
 * accessibility wiring.
 */
import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * Exposes the React Hook Form context provider under the local form API.
 */
const Form = FormProvider;

/**
 * Stores the active field name for nested form subcomponents.
 */
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

/**
 * Tracks the field currently being rendered so child slots can derive IDs and
 * validation state.
 */
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

/**
 * Binds a React Hook Form controller to the local field context.
 *
 * @param props - Controller props for the field.
 * @returns A controller wrapped with field metadata context.
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

/**
 * Resolves field metadata and accessibility IDs for nested form primitives.
 *
 * @returns Derived field state and generated element IDs.
 * @throws {Error} When used outside of a `FormField`.
 */
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

/**
 * Stores the generated DOM ID for a form item wrapper.
 */
type FormItemContextValue = {
  id: string;
};

/**
 * Tracks the current form item container for label and message associations.
 */
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

/**
 * Groups a field's control, label, description, and message elements.
 *
 * @param props - Container props for the form item wrapper.
 * @returns A form item wrapper with generated ID context.
 */
function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

/**
 * Renders a field label linked to the current form control.
 *
 * @param props - Label props.
 * @returns A label element styled for the current field state.
 */
function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

/**
 * Applies the current field's accessibility attributes to the wrapped control.
 *
 * @param props - Slot props forwarded to the field control.
 * @returns A slotted control wrapper with validation metadata.
 */
function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

/**
 * Renders helper text associated with the current form field.
 *
 * @param props - Paragraph props for the description element.
 * @returns A field description paragraph.
 */
function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

/**
 * Renders the current field validation message when present.
 *
 * @param props - Paragraph props for the message element.
 * @returns The field error message, fallback children, or `null`.
 */
function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};

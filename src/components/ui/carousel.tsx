"use client";

/**
 * Wraps Embla Carousel with shared application styling, context, and controls.
 */
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Represents the Embla carousel instance exposed to consumers.
 */
type CarouselApi = UseEmblaCarouselType[1];

/**
 * Captures the raw hook parameters accepted by `useEmblaCarousel`.
 */
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;

/**
 * Describes the configuration object forwarded to Embla.
 */
type CarouselOptions = UseCarouselParameters[0];

/**
 * Describes the plugin list supported by Embla.
 */
type CarouselPlugin = UseCarouselParameters[1];

/**
 * Defines the public configuration accepted by the carousel wrapper.
 */
type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

/**
 * Describes the shared state exposed to carousel descendants.
 */
type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

/**
 * Shares the active carousel instance and navigation state with child slots.
 */
const CarouselContext = React.createContext<CarouselContextProps | null>(null);

/**
 * Returns the active carousel context for nested carousel primitives.
 *
 * @returns The current carousel context.
 * @throws {Error} When used outside of a `Carousel` provider.
 */
function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

/**
 * Provides the carousel viewport, keyboard interactions, and navigation state.
 *
 * @param props - Carousel wrapper props and Embla configuration.
 * @param ref - Ref forwarded to the carousel region element.
 * @returns The configured carousel provider and region wrapper.
 */
const Carousel = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    const viewport = (
      // biome-ignore lint/a11y/useSemanticElements: the WAI-ARIA carousel pattern uses a generic container with role="group" and aria-roledescription="carousel"
      <section
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="group"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </section>
    );

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        {viewport}
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

/**
 * Renders the scrollable content track for a carousel instance.
 *
 * @param props - Content container props.
 * @param ref - Ref forwarded to the inner track element.
 * @returns The viewport and track elements for carousel slides.
 */
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

/**
 * Renders a single carousel slide item.
 *
 * @param props - Slide container props.
 * @param ref - Ref forwarded to the slide element.
 * @returns A slide element sized for the active carousel orientation.
 */
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  const slide = (
    // biome-ignore lint/a11y/useSemanticElements: <fieldset> is semantically incorrect for carousel slides; role="group" is the correct ARIA pattern
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );

  return slide;
});
CarouselItem.displayName = "CarouselItem";

/**
 * Renders the previous-slide navigation control.
 *
 * @param props - Button props for the control.
 * @param ref - Ref forwarded to the underlying button.
 * @returns A button that scrolls to the previous carousel item.
 */
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft className="size-6 lg:size-9" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

/**
 * Renders the next-slide navigation control.
 *
 * @param props - Button props for the control.
 * @param ref - Ref forwarded to the underlying button.
 * @returns A button that scrolls to the next carousel item.
 */
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight className="size-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};

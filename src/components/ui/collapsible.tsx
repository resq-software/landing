"use client";

/**
 * Re-exports the collapsible primitive family with a stable local API surface.
 */
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

/**
 * Provides the root container for collapsible content.
 */
const Collapsible = CollapsiblePrimitive.Root;

/**
 * Toggles the open state of a collapsible region.
 */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

/**
 * Renders the content area controlled by a collapsible trigger.
 */
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, defaultChecked, disabled, onCheckedChange, ...props }, ref) => {
    const generatedId = React.useId();
    const id = props.id ?? generatedId;

    return (
      <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={(event) => onCheckedChange?.(event.target.checked)}
          className="peer sr-only"
          {...props}
        />
        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded border border-input bg-background text-primary-foreground transition-colors",
            "peer-checked:border-primary peer-checked:bg-primary",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            className
          )}
          aria-hidden="true"
        />
        <Check className="pointer-events-none absolute h-3.5 w-3.5 text-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100" />
      </span>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `inline-flex items-center justify-center 
  rounded-md text-sm font-medium 
  ring-offset-white 
  transition-colors 
  focus-visible:outline-none 
  focus-visible:ring-2 
  focus-visible:ring-slate-400 
  focus-visible:ring-offset-2 
  disabled:cursor-not-allowed
  disabled:opacity-50 
  dark:ring-offset-slate-950 
  dark:focus-visible:ring-slate-800  `,
  {
    variants: {
      variant: {
        default: `h-auto   rounded-full 
        m:text-base 
        disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 
        hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 
        dark:focus:ring-offset-0 `,
        outline: `h-auto  rounded-full 
         sm:text-base 
       bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 
        hover:bg-gray-100 dark:hover:bg-slate-800 border border-slate-100 
        dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-primary-6000 dark:focus:ring-offset-0 `,
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

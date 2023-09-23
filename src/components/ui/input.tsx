"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { IoMdCloseCircle } from "react-icons/io";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  clearButton?: boolean;
  setValue?: (value: string) => void;
  wrapperClassName?: string;
  rightButton?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon: Icon,
      clearButton = false,
      setValue,
      wrapperClassName,
      rightButton,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          `
      flex h-full items-center space-x-3 rounded-xl bg-slate-50 px-4 py-2 dark:bg-slate-800
      `,
          wrapperClassName,
        )}
      >
        {Icon && Icon}
        <input
          type={type}
          className={cn(
            `w-full border-none bg-transparent py-2 text-sm text-light-main focus:outline-none focus:ring-0 disabled:cursor-not-allowed dark:text-dark-main `,
            className,
          )}
          autoFocus={false}
          ref={ref}
          {...props}
        />
        {clearButton && (
          <IoMdCloseCircle
            className="text-paper-dark dark:text-paper-light"
            size={25}
            onClick={() => setValue && setValue("")}
          />
        )}
        {rightButton && rightButton}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };

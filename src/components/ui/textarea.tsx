import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          `border-slate-20 text-smtext-light-main flex min-h-[100px] w-full rounded-xl  
          border border-none bg-slate-50   
          p-5 ring-offset-white
          placeholder:text-slate-500 focus:outline-none focus:ring-0 
          focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800  dark:text-dark-main`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };

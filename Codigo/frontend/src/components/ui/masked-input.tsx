import * as React from "react";
import InputMask from "react-input-mask"; // Certifique-se de importar o InputMask corretamente
import { cn } from "@/lib/utils";
import { Input } from "./Input"; // Importe o seu componente Input

const MaskedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <InputMask
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
MaskedInput.displayName = "MaskedInput";

export { MaskedInput };

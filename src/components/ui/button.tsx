import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        /* Primary conversion CTA — BOOK A CONSULTATION */
        cta: "rounded-[15px] bg-primary text-white font-label tracking-wide shadow-cta hover:bg-[#3a9f84] hover:-translate-y-0.5 active:translate-y-0",
        /* Secondary conversion CTA — CALL NOW */
        call: "rounded-full bg-call text-call-foreground font-bold tracking-wide hover:bg-ink/90 hover:-translate-y-0.5 active:translate-y-0",
        /* Call CTA on light surfaces, outlined */
        callOutline:
          "rounded-[15px] bg-mint-deep text-muted-foreground font-label tracking-wide hover:bg-[#b7e3d7]",
        /* CTA for dark ink sections */
        ctaLight:
          "rounded-[15px] bg-primary text-white font-label tracking-wide shadow-cta hover:bg-[#3a9f84] hover:-translate-y-0.5 active:translate-y-0",
        callLight:
          "rounded-[15px] border-2 border-ink-foreground/30 bg-transparent text-ink-foreground font-label tracking-wide hover:bg-ink-foreground/10",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-14 px-7 text-[15px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

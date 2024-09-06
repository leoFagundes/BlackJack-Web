import React, { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "flex items-center justify-center gap-2 py-2 px-3 min-w-[120px] max-w-[200px] rounded-md shadow-md duration-300",
  variants: {
    variant: {
      primary: "bg-white text-black hover:text-primary",
      secondary: "bg-secondary text-white hover:text-zinc-50",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  classNameExtension?: string;
  isDisabled?: boolean;
}

export default function Button({
  children,
  leftIcon,
  rightIcon,
  classNameExtension,
  variant,
  isDisabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`${classNameExtension} ${
        isDisabled ? "opacity-60" : ""
      } ${buttonVariants({ variant })}`}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

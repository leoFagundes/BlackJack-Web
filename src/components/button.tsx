import React, { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "flex items-center justify-center gap-2 py-2 px-3 min-w-[120px] max-w-[150px] rounded-md shadow-md duration-300",
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
}

export default function Button({
  children,
  leftIcon,
  rightIcon,
  classNameExtension,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${classNameExtension} ${buttonVariants({ variant })}`}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

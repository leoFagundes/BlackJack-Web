import React, { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
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
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${classNameExtension} flex items-center justify-center gap-2 py-2 px-3 min-w-[120px] rounded-md bg-white shadow-md text-black hover:text-primary duration-300`}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

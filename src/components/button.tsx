"use client";
import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onclickHandler?: () => void;
};
export const Button = ({
  className,
  children,
  onclickHandler,
}: ButtonProps) => {
  return (
    <button className={cn("", className)} onClick={() => onclickHandler}>
      {children}
    </button>
  );
};

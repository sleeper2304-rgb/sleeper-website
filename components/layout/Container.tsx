import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-[1460px] px-5 md:px-9 xl:px-12", className)}>{children}</div>;
}

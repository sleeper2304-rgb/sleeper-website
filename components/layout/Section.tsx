import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className }: SectionProps) {
  return <section className={cn("py-20 md:py-32", className)}>{children}</section>;
}

import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: string;
  variant?: "primary" | "ghost";
};

export function Button({ href, children, variant = "primary" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center border px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] transition duration-300",
        variant === "primary"
          ? "border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-bg"
          : "border-transparent text-muted hover:text-ink"
      )}
    >
      {children}
    </Link>
  );
}

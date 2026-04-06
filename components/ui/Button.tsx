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
        "inline-flex items-center justify-center border px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] transition",
        variant === "primary"
          ? "border-ink bg-ink text-bg hover:bg-transparent hover:text-ink"
          : "border-ink/20 text-ink hover:border-ink"
      )}
    >
      {children}
    </Link>
  );
}

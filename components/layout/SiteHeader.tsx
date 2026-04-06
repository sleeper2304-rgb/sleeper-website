import { siteConfig } from "@/data/site";
import { Container } from "./Container";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-bg/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-wide">
          Sleeper
        </Link>
        <nav className="hidden gap-7 md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-xs uppercase tracking-[0.18em] text-muted transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="text-xs uppercase tracking-[0.18em] text-ink">
          Start Project
        </Link>
      </Container>
    </header>
  );
}

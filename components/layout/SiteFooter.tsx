import { siteConfig } from "@/data/site";
import { Container } from "./Container";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-ink/10 py-12 md:py-16">
      <Container className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="font-serif text-3xl">Sleeper</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{siteConfig.description}</p>
        </div>

        <div className="space-y-2 text-sm text-muted md:text-right">
          <p>{siteConfig.address}</p>
          <p>{siteConfig.email}</p>
          <p>{siteConfig.phone}</p>
          <Link href="/contact" className="inline-block pt-3 text-[11px] uppercase tracking-[0.17em] text-ink">
            Start a project
          </Link>
        </div>
      </Container>
    </footer>
  );
}

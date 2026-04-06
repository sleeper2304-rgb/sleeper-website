import { siteConfig } from "@/data/site";
import { Container } from "./Container";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 py-10">
      <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-xl">Sleeper</p>
          <p className="mt-2 max-w-md text-sm text-muted">{siteConfig.description}</p>
        </div>
        <div className="space-y-1 text-sm text-muted md:text-right">
          <p>{siteConfig.address}</p>
          <p>{siteConfig.email}</p>
          <p>{siteConfig.phone}</p>
          <Link href="/contact" className="inline-block pt-2 text-xs uppercase tracking-[0.18em] text-ink">
            Liên hệ
          </Link>
        </div>
      </Container>
    </footer>
  );
}

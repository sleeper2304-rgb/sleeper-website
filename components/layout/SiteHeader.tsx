"use client";

import { siteConfig } from "@/data/site";
import { Container } from "./Container";
import Link from "next/link";
import { useState } from "react";
import { EditorialMenuOverlay } from "./EditorialMenuOverlay";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-bg/90 backdrop-blur-sm">
        <Container className="flex h-12 items-center justify-between md:h-14">
          <Link href="/" className="font-serif text-[1.35rem] tracking-[0.02em]">
            Sleeper
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-[11px] font-medium uppercase tracking-[0.17em] text-muted/90 hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="text-[11px] uppercase tracking-[0.17em] text-ink/85 hover:text-ink"
          >
            Menu
          </button>
        </Container>
      </header>

      <EditorialMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

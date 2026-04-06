"use client";

import { siteConfig } from "@/data/site";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type EditorialMenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function EditorialMenuOverlay({ open, onClose }: EditorialMenuOverlayProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-sm"
        >
          <div className="mx-auto flex h-full w-full max-w-[1460px] flex-col justify-between px-5 pb-10 pt-24 md:px-9 xl:px-12">
            <nav className="grid gap-2 md:gap-3">
              {siteConfig.nav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.45, delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="inline-flex items-end gap-4 font-serif text-5xl leading-none md:text-7xl"
                  >
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted">0{index + 1}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center justify-between border-t border-ink/10 pt-6 text-[11px] uppercase tracking-[0.17em] text-muted">
              <p>Sleeper Studio</p>
              <button type="button" onClick={onClose} className="text-ink hover:text-muted">
                Close
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

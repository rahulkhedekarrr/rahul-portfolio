"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { X, Mail, Linkedin } from "lucide-react";
import { NavItem } from "../../types";
import { emailComposeUrl } from "../../data/contacts";
import { smoothScrollTo } from "../../utils/smoothScroll";

interface NavigationProps {
  items: NavItem[];
}

const Navigation = memo(({ items }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-0 left-0 right-0 z-50 border-b border-sharp bg-sharp/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <a
            href="/"
            className="font-mono text-sm font-semibold tracking-[0.2em] text-sharp-fg transition-colors hover:text-sharp-accent"
          >
            RK
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="group relative font-mono text-xs uppercase tracking-[0.16em] text-sharp-muted transition-colors hover:text-sharp-fg"
                onClick={(e) => {
                  if (item.href.startsWith("/")) return;
                  e.preventDefault();
                  smoothScrollTo(item.href);
                }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-sharp-accent transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button
            type="button"
            className="relative z-[100] border border-sharp p-2 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sharp-accent)]"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <div className="flex h-5 w-5 flex-col items-center justify-center">
              <span
                className={`block h-px w-5 bg-sharp-fg transition-transform duration-300 ${
                  isMobileMenuOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`mt-1 block h-px w-5 bg-sharp-fg transition-opacity duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`mt-1 block h-px w-5 bg-sharp-fg transition-transform duration-300 ${
                  isMobileMenuOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[90] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={toggleMobileMenu}
            >
              <div className="absolute inset-0 bg-black/70" />
            </motion.div>

            <motion.div
              id="mobile-navigation"
              className="fixed top-0 right-0 z-[100] h-screen w-72 max-w-[85vw] border-l border-sharp bg-sharp-surface sm:w-80 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="flex h-screen flex-col">
                <div className="flex flex-shrink-0 items-center justify-between border-b border-sharp p-5">
                  <div className="font-mono text-sm tracking-[0.2em] text-sharp-fg">
                    RK
                  </div>
                  <button
                    type="button"
                    className="border border-sharp p-2 transition-colors hover:border-sharp-accent"
                    onClick={toggleMobileMenu}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5 text-sharp-fg" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                  <div className="space-y-1">
                    {items.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        className="block border-b border-sharp px-1 py-3 font-mono text-sm uppercase tracking-[0.14em] text-sharp-muted transition-colors hover:text-sharp-accent"
                        onClick={(e) => {
                          if (item.href.startsWith("/")) {
                            toggleMobileMenu();
                            return;
                          }
                          e.preventDefault();
                          toggleMobileMenu();
                          setTimeout(() => {
                            smoothScrollTo(item.href);
                          }, 280);
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-sharp pt-6">
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-sharp-muted">
                      Get in touch
                    </p>
                    <div className="space-y-2">
                      <a
                        href={emailComposeUrl}
                        className="flex items-center gap-3 px-1 py-2 text-sharp-muted transition-colors hover:text-sharp-fg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Mail className="h-4 w-4 text-sharp-accent" />
                        <span className="font-mono text-sm">Email</span>
                      </a>
                      <a
                        href="https://linkedin.com/in/rahulkhedekarr"
                        className="flex items-center gap-3 px-1 py-2 text-sharp-muted transition-colors hover:text-sharp-fg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-4 w-4 text-sharp-accent" />
                        <span className="font-mono text-sm">LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;

"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { X, Mail, Linkedin } from "lucide-react";
import { NavItem } from "../../types";
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
        className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 smooth-scroll"
        style={{
          background: "transparent",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          boxShadow: "none",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="group rounded-2xl border border-white/20 backdrop-blur-optimized p-4 hover-optimized"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "none",
            }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex justify-between items-center">
              <motion.div
                className="text-xl sm:text-2xl font-bold text-white"
                whileHover={{ scale: 1.08, rotate: 2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                RK
              </motion.div>

              <div className="hidden md:flex space-x-6 lg:space-x-8">
                {items.map((item) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors duration-200 hover-optimized"
                    onClick={(e) => {
                      if (item.href.startsWith("/")) return;
                      e.preventDefault();
                      smoothScrollTo(item.href);
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <motion.button
                type="button"
                className="md:hidden relative z-[100] p-2 rounded-xl backdrop-blur-optimized border border-white/20 hover-optimized"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`w-6 h-0.5 bg-white block rounded-full transition-transform duration-300 ${
                      isMobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`w-6 h-0.5 bg-white block rounded-full mt-1 transition-opacity duration-300 ${
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`w-6 h-0.5 bg-white block rounded-full mt-1 transition-transform duration-300 ${
                      isMobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                    }`}
                  />
                </div>
              </motion.button>
            </div>
          </motion.div>
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
              transition={{ duration: 0.25 }}
              onClick={toggleMobileMenu}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            </motion.div>

            <motion.div
              className="fixed top-0 right-0 h-screen w-72 sm:w-80 max-w-[85vw] z-[100] md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="h-screen backdrop-blur-xl bg-[#0a0a0a]/98 border-l border-white/20 shadow-2xl flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
                  <div className="text-2xl font-bold text-white">RK</div>
                  <button
                    type="button"
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                    onClick={toggleMobileMenu}
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        className="block px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 text-lg font-medium"
                        onClick={(e) => {
                          if (item.href.startsWith("/")) {
                            toggleMobileMenu();
                            return;
                          }
                          e.preventDefault();
                          toggleMobileMenu();
                          setTimeout(() => {
                            smoothScrollTo(item.href);
                          }, 300);
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <h3 className="text-white/60 text-sm font-medium mb-4 uppercase tracking-wider">
                      Get In Touch
                    </h3>
                    <div className="space-y-3">
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=khedekarrahul4@gmail.com"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Mail className="w-5 h-5 text-purple-400" />
                        <span className="text-white/80">Email</span>
                      </a>
                      <a
                        href="https://linkedin.com/in/rahulkhedekarr"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-5 h-5 text-cyan-400" />
                        <span className="text-white/80">LinkedIn</span>
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

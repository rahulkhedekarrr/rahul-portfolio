"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail, Linkedin } from "lucide-react";
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

  // Remove scroll effect - navbar stays consistent
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY;
  //     setIsScrolled(scrollTop > 20);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Restore body scroll
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
      // Cleanup on unmount
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 smooth-scroll"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.1,
        }}
        style={{
          background: "transparent",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          boxShadow: "none",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="group rounded-2xl border border-white/20 backdrop-blur-optimized p-4 hover-optimized gpu-accelerated transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)", // ✅ your requested background
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "none", // ✅ removes shadow
            }}
          >
            <div className="flex justify-between items-center">
              <motion.div
                className="text-xl sm:text-2xl font-bold text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.3,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 2,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                RK
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-6 lg:space-x-8">
                {items.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors duration-200 hover-optimized"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo(item.href);
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 0.4 + index * 0.08,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* Mobile Hamburger Menu Button */}
              <motion.button
                className="md:hidden relative z-[100] p-2 rounded-xl backdrop-blur-optimized border border-white/20 hover-optimized gpu-accelerated"
                onClick={toggleMobileMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <motion.div
                  className="w-6 h-6 flex flex-col justify-center items-center"
                  animate={isMobileMenuOpen ? "open" : "closed"}
                >
                  <motion.span
                    className="w-6 h-0.5 bg-white block rounded-full"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 6 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <motion.span
                    className="w-6 h-0.5 bg-white block rounded-full mt-1"
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <motion.span
                    className="w-6 h-0.5 bg-white block rounded-full mt-1"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -6 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Mobile Menu Overlay */}
            <motion.div
              className="fixed inset-0 z-[90] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMobileMenu}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            </motion.div>

            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 h-screen w-72 sm:w-80 max-w-[85vw] z-[100] md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="h-screen backdrop-blur-optimized bg-slate-900/95 border-l border-white/20 shadow-2xl flex flex-col">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
                  <motion.div
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    RK
                  </motion.div>
                  <motion.button
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                    onClick={toggleMobileMenu}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.button>
                </div>

                {/* Menu Items - Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-2">
                    {items.map((item, index) => (
                      <motion.a
                        key={item.id}
                        href={item.href}
                        className="block px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 text-lg font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          smoothScrollTo(item.href);
                          // Close mobile menu after a short delay to allow scroll to start
                          setTimeout(() => {
                            toggleMobileMenu();
                          }, 100);
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 + index * 0.1,
                        }}
                        whileHover={{
                          scale: 1.02,
                          x: 8,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </div>

                  {/* Contact Links in Mobile Menu */}
                  <motion.div
                    className="mt-8 pt-6 border-t border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <h3 className="text-white/60 text-sm font-medium mb-4 uppercase tracking-wider">
                      Get In Touch
                    </h3>
                    <div className="space-y-3">
                      <motion.a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=khedekarrahul4@gmail.com"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        target="_blank"
                      >
                        <Mail className="w-5 h-5 text-purple-400" />
                        <span className="text-white/80">Email</span>
                      </motion.a>
                      <motion.a
                        href="https://linkedin.com/in/rahulkhedekarr"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        target="_blank"
                      >
                        <Linkedin className="w-5 h-5 text-cyan-400" />
                        <span className="text-white/80">LinkedIn</span>
                      </motion.a>
                    </div>
                  </motion.div>
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

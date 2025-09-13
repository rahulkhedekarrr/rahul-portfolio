"use client";

import { memo } from "react";
import { m as motion } from "framer-motion";
import { ContactLink as ContactLinkType } from "../../types";

interface ContactLinkProps {
  link: ContactLinkType;
}

const ContactLink = memo(({ link }: ContactLinkProps) => {
  const IconComponent = link.icon;
  return (
    <motion.a
      href={link.href}
      className="group flex flex-wrap items-center justify-center sm:justify-start space-x-3 backdrop-blur-optimized border border-white/20 rounded-2xl p-4 hover-optimized gpu-accelerated w-full sm:w-auto"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.95 }}
      target="_blank"
    >
      <motion.div
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <IconComponent className={`w-6 h-6 ${link.color}`} />
      </motion.div>
      <span className="text-white font-medium text-optimized break-all min-w-0">
        {link.label}
      </span>
    </motion.a>
  );
});

ContactLink.displayName = "ContactLink";

export default ContactLink;

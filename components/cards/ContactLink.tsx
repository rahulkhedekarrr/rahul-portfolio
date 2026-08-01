"use client";

import { memo } from "react";
import { m as motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";
import { ContactLink as ContactLinkType } from "../../types";

interface ContactLinkProps {
  link: Omit<ContactLinkType, "icon"> & { icon?: ContactLinkType["icon"] };
}

const iconMap = {
  email: Mail,
  linkedin: Linkedin,
} as const;

const ContactLink = memo(({ link }: ContactLinkProps) => {
  const IconComponent =
    link.icon || iconMap[link.id as keyof typeof iconMap] || Mail;

  return (
    <motion.a
      href={link.href}
      className="group flex flex-wrap items-center justify-center sm:justify-start space-x-3 backdrop-blur-optimized border border-white/20 rounded-2xl p-4 hover-optimized w-full sm:w-auto"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.span
        whileHover={{ scale: 1.12, rotate: 4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <IconComponent className={`w-6 h-6 ${link.color}`} />
      </motion.span>
      <span className="text-white font-medium text-optimized break-all min-w-0">
        {link.label}
      </span>
    </motion.a>
  );
});

ContactLink.displayName = "ContactLink";

export default ContactLink;

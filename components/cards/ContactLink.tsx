"use client";

import { memo } from "react";
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
    <a
      href={link.href}
      className="group flex w-full items-center gap-3 border border-sharp bg-sharp px-4 py-4 transition-colors hover:border-sharp-accent sm:w-auto"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconComponent className="h-5 w-5 shrink-0 text-sharp-accent" />
      <span className="min-w-0 break-all font-mono text-sm text-sharp-fg transition-colors group-hover:text-sharp-accent">
        {link.label}
      </span>
    </a>
  );
});

ContactLink.displayName = "ContactLink";

export default ContactLink;

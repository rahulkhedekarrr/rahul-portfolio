"use client";

import { m as motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import ContactLink from "../cards/ContactLink";
import { contactLinks, emailComposeUrl } from "../../data/contacts";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative z-10 px-4 py-20 sm:px-6 sm:py-24 smooth-scroll"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Contact" index="05 / contact" />

        <motion.div
          className="max-w-3xl border border-sharp bg-sharp-surface p-6 sm:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h3 className="mb-3 text-2xl font-semibold text-sharp-fg">
            Let&apos;s build something
          </h3>
          <p className="mb-8 max-w-xl text-sharp-muted">
            Got a product in mind? Tell me what you&apos;re trying to ship —
            happy to figure out if I&apos;m the right person to help.
          </p>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {contactLinks.map(({ icon: _icon, ...link }) => (
              <ContactLink key={link.id} link={link} />
            ))}
          </div>

          <a
            href={emailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sharp btn-sharp-primary"
          >
            Email me
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

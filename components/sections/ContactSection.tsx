"use client";

import { m as motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import ContactLink from "../cards/ContactLink";
import { contactLinks } from "../../data/contacts";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 smooth-scroll pt-20 sm:pt-24"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Let's Connect" />

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 md:p-12 hover-optimized"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            whileHover={{ scale: 1.015 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4 text-optimized">
                Ready to work together?
              </h3>
              <p className="text-white/80 text-lg text-optimized">
                Let&apos;s discuss your next project or just say hello!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8">
              {contactLinks.map(({ icon: _icon, ...link }) => (
                <ContactLink key={link.id} link={link} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

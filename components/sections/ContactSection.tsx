"use client";

import { m as motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import ContactLink from "../cards/ContactLink";
import { ContactLink as ContactLinkType } from "../../types";

interface ContactSectionProps {
  contactLinks: ContactLinkType[];
}

const ContactSection = ({ contactLinks }: ContactSectionProps) => {
  return (
    <motion.section
      id="contact"
      className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 smooth-scroll pt-20 sm:pt-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Contact Rahul Khedekar - Full Stack Developer" />

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 md:p-12 gpu-accelerated"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center mb-8">
              <motion.h3
                className="text-2xl font-bold text-white mb-4 text-optimized"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Ready to work together?
              </motion.h3>
              <motion.p
                className="text-white/80 text-lg text-optimized"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Let's discuss your next project or just say hello!
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {contactLinks.map((link) => (
                <ContactLink key={link.id} link={link} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;

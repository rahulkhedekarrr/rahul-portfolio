"use client";

import { m as motion } from "framer-motion";
import { Code, Server } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { AboutItem } from "../../types";

interface AboutSectionProps {
  aboutItems: AboutItem[];
}

const AboutSection = ({ aboutItems }: AboutSectionProps) => {
  return (
    <section
      id="about"
      className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 smooth-scroll pt-20 sm:pt-24"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="About Me" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 hover-optimized"
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-optimized">
              Passionate Developer
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed text-optimized">
              I&apos;m a dedicated Full Stack Web Developer with expertise in the
              MERN stack. I love creating seamless, user-friendly applications
              that solve real-world problems. My passion lies in turning ideas
              into powerful digital solutions.
            </p>
            <p className="text-white/80 mb-6 leading-relaxed text-optimized">
              With experience in both frontend and backend development, I bring
              a comprehensive understanding of web technologies to every
              project. I&apos;m always eager to learn new technologies and stay
              updated with the latest industry trends.
            </p>
            <div className="flex space-x-4">
              <motion.div
                className="flex items-center space-x-2 text-purple-400"
                whileHover={{ scale: 1.05 }}
              >
                <Code className="w-5 h-5" />
                <span className="text-optimized">Frontend Expert</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 text-cyan-400"
                whileHover={{ scale: 1.05 }}
              >
                <Server className="w-5 h-5" />
                <span className="text-optimized">Backend Specialist</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 hover-optimized"
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="space-y-6">
              {aboutItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`border-l-4 ${item.borderColor} pl-6`}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    ease: "easeOut",
                    delay: 0.1 + index * 0.08,
                  }}
                >
                  <h4 className="text-xl font-semibold text-white mb-2 text-optimized">
                    {item.title}
                  </h4>
                  <p className="text-white/80 text-optimized">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Code2 } from "lucide-react";
import Image from "next/image";

// Custom SVG Icons
const GithubIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background animated circles - adjusted for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12"
        >
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div variants={itemVariants}>
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                Software Engineer
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent block sm:inline">
                Musa Algoni
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 px-4 sm:px-0">
              I build exceptional and accessible digital experiences with modern web technologies. 5+ years of experience in full-stack development.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
              >
                View My Work
                <ArrowDown className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf"
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border-2 border-purple-500 rounded-full text-purple-400 font-semibold flex items-center justify-center gap-2 hover:bg-purple-500/10 transition-all text-sm sm:text-base"
              >
                Download CV
                <Download className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Social Icons - Enhanced for mobile */}
            <motion.div variants={itemVariants} className="flex gap-4 sm:gap-6 justify-center lg:justify-start mt-6 sm:mt-8">
              <motion.a
                whileHover={{ y: -3 }}
                href="https://github.com"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors p-2 sm:p-0"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href="https://linkedin.com"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors p-2 sm:p-0"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href="mailto:musa@example.com"
                className="text-gray-400 hover:text-white transition-colors p-2 sm:p-0"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            </motion.div>
          </div>

          {/* Animated Profile Picture - Responsive sizing */}
          <motion.div
            variants={itemVariants}
            className="flex-1 flex justify-center mt-8 lg:mt-0"
          >
            <motion.div
              animate={floatingAnimation}
              className="relative group"
            >
              {/* Animated Border */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              
              {/* Profile Image Container - Responsive sizes */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 z-10" />
                <Image
                  src="/profile.jpg"
                  alt="Musa Algoni - Software Engineer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>

              {/* Tech Icons floating around - Hidden on very small screens */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 hidden sm:block"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
                  <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Hidden on very small screens */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-purple-500 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
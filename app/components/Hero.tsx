"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Code2 } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

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

  // WhatsApp number
  const whatsappNumber = "2349014899278";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleViewWork = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const link = document.createElement('a');
      link.href = '/cv.pdf';
      link.download = 'Musa_Algoni_CV.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 100);
    } catch (error) {
      window.open('/cv.pdf', '_blank');
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 pb-0 sm:pb-0 md:pb-1">
      {/* Background animated circles */}
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

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-12"
        >
          {/* Text Content */}
          <div className="flex-1 min-w-0 text-left">
            <motion.div variants={itemVariants}>
              <span className="inline-block px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 text-[10px] sm:text-xs md:text-sm font-semibold mb-2 sm:mb-3 md:mb-4">
                Software Engineer
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent whitespace-nowrap">
                Musa Algoni
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 mb-3 sm:mb-4 md:mb-6 max-w-xl pr-2">
              I build exceptional and accessible digital experiences with modern web technologies. 3+ years of experience in full-stack development.
            </motion.p>

            {/* Buttons - Wrapped in div with relative z-index and pointer events */}
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 relative z-10">
              <button
                onClick={handleViewWork}
                type="button"
                className="px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg transition-all text-[10px] sm:text-xs md:text-sm lg:text-base cursor-pointer hover:opacity-90 active:scale-95 whitespace-nowrap"
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                View My Work
                <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              </button>

              <button
                onClick={handleDownloadCV}
                type="button"
                className="px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3 bg-transparent border-2 border-purple-500 rounded-full text-purple-400 font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all text-[10px] sm:text-xs md:text-sm lg:text-base cursor-pointer hover:bg-purple-500/10 active:scale-95 whitespace-nowrap"
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                Download CV
                <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              </button>
            </div>

            {/* Social Icons */}
            <motion.div variants={itemVariants} className="flex gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors p-1 sm:p-1.5 md:p-2"
                aria-label="GitHub"
              >
                <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/emaicee"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors p-1 sm:p-1.5 md:p-2"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                className="text-gray-400 hover:text-green-400 transition-colors p-1 sm:p-1.5 md:p-2"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </a>
              <a
                href="mailto:algonimusa202@gmail.com"
                className="text-gray-400 hover:text-white transition-colors p-1 sm:p-1.5 md:p-2"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </a>
            </motion.div>
          </div>

          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <motion.div
              animate={floatingAnimation}
              className="relative group"
            >
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
              
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-56 xl:h-56 rounded-full overflow-hidden border-2 sm:border-3 md:border-4 border-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 z-10" />
                <Image
                  src="/profile.jpg"
                  alt="Musa Algoni - Software Engineer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 128px, 224px"
                />
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:-top-3 md:-right-3"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
                  <Code2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-purple-500" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-1 sm:bottom-1.5 md:bottom-2 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <div className="w-3.5 h-5 sm:w-4 sm:h-6 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-1.5 sm:w-1 sm:h-2 bg-purple-500 rounded-full mt-1"
          />
        </div>
      </motion.div>
    </section>
  );
}
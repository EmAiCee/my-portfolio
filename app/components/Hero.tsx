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
    <section id="home" className="min-h-[85vh] sm:min-h-[90vh] md:min-h-screen flex items-center justify-center relative overflow-hidden pt-14 sm:pt-16 md:pt-20 pb-0">
      {/* Background animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute right-0 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12"
        >
          {/* Text Content */}
          <div className="flex-1 w-full sm:w-auto text-center sm:text-left">
            <motion.div variants={itemVariants}>
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 md:py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 md:mb-4">
                Software Engineer
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Musa Algoni
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto sm:mx-0">
              I build exceptional and accessible digital experiences with modern web technologies. 3+ years of experience in full-stack development.
            </motion.p>

            {/* Buttons - Placed OUTSIDE motion to ensure clickability */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start relative z-20">
              <button
                onClick={handleViewWork}
                type="button"
                className="px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold flex items-center justify-center gap-2 shadow-lg transition-all text-sm sm:text-base cursor-pointer hover:opacity-90 active:scale-95 whitespace-nowrap"
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                View My Work
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={handleDownloadCV}
                type="button"
                className="px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 bg-transparent border-2 border-purple-500 rounded-full text-purple-400 font-semibold flex items-center justify-center gap-2 transition-all text-sm sm:text-base cursor-pointer hover:bg-purple-500/10 active:scale-95 whitespace-nowrap"
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                Download CV
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Social Icons */}
            <motion.div variants={itemVariants} className="flex gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-5 md:mt-6 justify-center sm:justify-start">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/emaicee"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </a>
              <a
                href="mailto:algonimusa202@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </a>
            </motion.div>
          </div>

          {/* Profile Picture */}
          <div className="flex-shrink-0 mt-4 sm:mt-0">
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
              
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52 2xl:w-60 2xl:h-60 rounded-full overflow-hidden border-2 sm:border-3 md:border-4 border-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 z-10" />
                <Image
                  src="/profile.jpg"
                  alt="Musa Algoni - Software Engineer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 144px, 240px"
                />
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:-top-3 md:-right-3"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
                  <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-purple-500" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-1 sm:bottom-1.5 md:bottom-2 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <div className="w-3 h-4 sm:w-3.5 sm:h-5 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-1 sm:w-0.5 sm:h-1.5 bg-purple-500 rounded-full mt-0.5 sm:mt-1"
          />
        </div>
      </motion.div>
    </section>
  );
}
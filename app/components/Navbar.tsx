"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Code2, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // WhatsApp number - Replace with your actual number
  const whatsappNumber = "2349014899278"; // <-- CHANGE THIS
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-black/50 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer z-10"
          >
            <Code2 className="w-7 h-7 sm:w-8 sm:h-8 text-purple-500" />
            <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              My-Portfolio
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ scale: 1.05 }}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </motion.a>
            ))}
            <div className="flex items-center space-x-4">
              <motion.a
                whileHover={{ y: -2 }}
                href="https://github.com/EmAiCee"
                target="_blank"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                 href="https://www.linkedin.com/in/emaicee"
                target="_blank"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href={whatsappLink}
                target="_blank"
                className="text-green-400 hover:text-green-300 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="mailto:musa@example.com"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg transition-colors z-10 relative"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 rounded-xl overflow-hidden"
          >
            <div className="backdrop-blur-md bg-black/70 rounded-xl p-4 border border-white/10">
              <div className="space-y-2 mb-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              
              <div className="border-t border-white/10 my-4"></div>
              
              <div className="flex items-center justify-center space-x-8 pt-2">
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://github.com"
                  target="_blank"
                  onClick={handleLinkClick}
                  className="text-gray-300 hover:text-white transition-colors p-2"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-6 h-6" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://linkedin.com"
                  target="_blank"
                  onClick={handleLinkClick}
                  className="text-gray-300 hover:text-white transition-colors p-2"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href={whatsappLink}
                  target="_blank"
                  onClick={handleLinkClick}
                  className="text-green-400 hover:text-green-300 transition-colors p-2"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="mailto:musa@example.com"
                  onClick={handleLinkClick}
                  className="text-gray-300 hover:text-white transition-colors p-2"
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
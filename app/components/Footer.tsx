"use client";

import { motion } from "framer-motion";
import { Code2, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Code2 className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-400">
              © {currentYear} John Doe. All rights reserved.
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-1 text-sm text-gray-400"
          >
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>using Next.js & Tailwind CSS</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
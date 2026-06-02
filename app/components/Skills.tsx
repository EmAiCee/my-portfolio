"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Official JavaScript Icon
const JavascriptIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#F7DF1E" stroke="none"/>
    <text x="12" y="17" fontSize="10" textAnchor="middle" fill="#000000" fontFamily="Arial, sans-serif" fontWeight="bold">JS</text>
  </svg>
);

// Official TypeScript Icon
const TypescriptIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6" stroke="none"/>
    <text x="12" y="17" fontSize="10" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontWeight="bold">TS</text>
  </svg>
);

// Custom Professional SVG Icons for other skills
const NextjsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const ReactIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2.5"/>
    <path d="M12 2a15 15 0 0 0 0 20 15 15 0 0 0 0-20z" opacity="0.5"/>
    <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" opacity="0.5"/>
    <ellipse cx="12" cy="12" rx="9" ry="4.5" transform="rotate(30 12 12)"/>
    <ellipse cx="12" cy="12" rx="9" ry="4.5" transform="rotate(-30 12 12)"/>
  </svg>
);

const HtmlIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l2 16 6 2 6-2 2-16H4z"/>
    <path d="M8 8h8M8 12h6M10 16h4"/>
  </svg>
);

const CssIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l2 16 6 2 6-2 2-16H4z"/>
    <path d="M8 8h8M7 12h10M9 16h6"/>
    <circle cx="12" cy="8" r="1" fill="currentColor"/>
  </svg>
);

const NodeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8v8M8 12h8"/>
  </svg>
);

const GitIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2"/>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);

const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const MongodbIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    <path d="M12 8v8M8 12h8"/>
  </svg>
);

const PostgresIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    <path d="M9 9h6M9 15h6"/>
  </svg>
);

// Professional Icons for Stats
const BriefcaseIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const ProjectIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ClientIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const StackIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
    <line x1="8" y1="2" x2="8" y2="22"/>
    <line x1="16" y1="2" x2="16" y2="22"/>
    <line x1="2" y1="8" x2="22" y2="8"/>
    <line x1="2" y1="16" x2="22" y2="16"/>
  </svg>
);

const skills = [
  { name: "Next.js", level: 90, icon: <NextjsIcon className="w-5 h-5" /> },
  { name: "React", level: 92, icon: <ReactIcon className="w-5 h-5" /> },
  { name: "TypeScript", level: 88, icon: <TypescriptIcon className="w-5 h-5" /> },
  { name: "HTML", level: 95, icon: <HtmlIcon className="w-5 h-5" /> },
  { name: "CSS", level: 92, icon: <CssIcon className="w-5 h-5" /> },
  { name: "JavaScript", level: 94, icon: <JavascriptIcon className="w-5 h-5" /> },
  { name: "Node.js", level: 87, icon: <NodeIcon className="w-5 h-5" /> },
  { name: "Git", level: 90, icon: <GitIcon className="w-5 h-5" /> },
  { name: "GitHub", level: 92, icon: <GithubIcon className="w-5 h-5" /> },
  { name: "MongoDB", level: 93, icon: <MongodbIcon className="w-5 h-5" /> },
  { name: "PostgreSQL", level: 86, icon: <PostgresIcon className="w-5 h-5" /> },
];

const SkillBar = ({ skill, index }: { skill: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between mb-2">
        <span className="text-gray-300 font-medium flex items-center gap-2">
          <span className="text-purple-400">{skill.icon}</span>
          {skill.name}
        </span>
        <span className="text-purple-400">{skill.level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 }}
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Technologies and tools I work with to build amazing applications
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <SkillBar skill={skill} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Years Experience", value: "5+", icon: <BriefcaseIcon className="w-8 h-8" /> },
            { label: "Projects Completed", value: "50+", icon: <ProjectIcon className="w-8 h-8" /> },
            { label: "Happy Clients", value: "30+", icon: <ClientIcon className="w-8 h-8" /> },
            { label: "Tech Stack", value: "11+", icon: <StackIcon className="w-8 h-8" /> },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10"
            >
              <div className="text-purple-400 mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-bold text-purple-400">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
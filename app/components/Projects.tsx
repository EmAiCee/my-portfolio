"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

// Custom SVG Icons
const GithubIcon = ({ className = "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const categories = ["All", "fullstack", "frontend", "backend", "devops"];

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  live: string;
  category: string;
  featured: boolean;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/projects');
      
      if (!res.ok) {
        throw new Error(`Failed to fetch projects: ${res.status}`);
      }
      
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects. Please refresh the page.');
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    if (activeCategory === "All") {
      return projects;
    }
    return projects.filter(project => project.category === activeCategory);
  }, [projects, activeCategory]);

  const sortedProjects = useMemo(() => {
    if (!filteredProjects || filteredProjects.length === 0) return [];
    return [...filteredProjects].sort((a, b) => {
      if (a.featured === b.featured) return 0;
      return a.featured ? -1 : 1;
    });
  }, [filteredProjects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-4 sm:py-6 px-3 sm:px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center h-24 sm:h-32">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-4 sm:py-6 px-3 sm:px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 max-w-md mx-auto">
            <p className="text-red-400 text-sm">{error}</p>
            <button
              onClick={fetchProjects}
              className="mt-2 px-4 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Tighter margin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-3 sm:mb-4 md:mb-6"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1">
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-300 text-xs max-w-2xl mx-auto px-2">
            Here are some of my recent projects
          </p>
        </motion.div>

        {/* Category Filter - Tighter margin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-1 sm:gap-1.5 mb-3 sm:mb-4 md:mb-6"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-2.5 sm:px-3 md:px-4 py-1 text-[10px] sm:text-xs rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {category === "All" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid - 3 columns on ALL screens */}
        {sortedProjects.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-400 text-sm">No projects found.</p>
          </div>
        ) : (
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4"
          >
            {sortedProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                onClick={() => handleProjectClick(project._id)}
                onMouseEnter={() => setHoveredProject(project._id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
              >
                {/* Project Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-800">
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-500/30 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-pink-500/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
                  </div>
                  
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain relative z-10"
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/600x400/1e1b4b/ffffff?text=Project';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
                  {project.featured && (
                    <div className="absolute top-0.5 right-0.5 bg-yellow-500/90 text-black text-[5px] sm:text-[7px] font-bold px-1 py-0.5 rounded-full z-20">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Project Content - Very Compact */}
                <div className="p-1 sm:p-1.5">
                  <h3 className="text-[7px] sm:text-[10px] md:text-xs font-bold mb-0.5 text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-[5px] sm:text-[7px] md:text-[10px] mb-0.5 line-clamp-2">
                    {project.description.length > 50 ? project.description.substring(0, 50) + '...' : project.description}
                  </p>

                  {/* Tech Stack - Very Compact */}
                  <div className="flex flex-wrap gap-0.5 mb-0.5">
                    {project.tech.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="px-0.5 py-0.5 text-[4px] sm:text-[6px] md:text-[8px] rounded-full bg-purple-500/20 text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 2 && (
                      <span className="px-0.5 py-0.5 text-[4px] sm:text-[6px] md:text-[8px] rounded-full bg-white/10 text-gray-400">
                        +{project.tech.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Links - Very Compact */}
                  <div className="flex gap-0.5">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-0.5 text-gray-400 hover:text-white transition-colors text-[4px] sm:text-[6px] md:text-[8px]"
                    >
                      <GithubIcon className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5" />
                      <span>Code</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-0.5 text-gray-400 hover:text-white transition-colors text-[4px] sm:text-[6px] md:text-[8px]"
                    >
                      <ExternalLink className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5" />
                      <span>Live</span>
                    </motion.a>
                  </div>
                </div>

                {hoveredProject === project._id && (
                  <motion.div
                    layoutId="hoverBorder"
                    className="absolute inset-0 border-2 border-purple-500 rounded-lg pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
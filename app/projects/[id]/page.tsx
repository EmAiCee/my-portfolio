"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, Calendar, Tag, Layers } from 'lucide-react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

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
  createdAt: string;
}

export default function ProjectDetails() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`/api/projects/${params.id}`);
      
      if (res.status === 404) {
        setError('Project not found');
        return;
      }
      
      if (!res.ok) {
        throw new Error(`Failed to fetch project: ${res.status}`);
      }
      
      const data = await res.json();
      setProject(data);
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-white mb-2">Project Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The project you\'re looking for doesn\'t exist.'}</p>
          <button
            onClick={() => router.push('/#projects')}
            className="px-6 py-2 bg-purple-500 rounded-lg text-white hover:bg-purple-600 transition"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/#projects')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </motion.button>

        {/* Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10"
        >
          {/* Project Image - With colorful gradient background */}
          <div className="relative w-full bg-gray-900" style={{ height: '400px' }}>
            {/* Animated background circles */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
              <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>
            
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain relative z-10"
              sizes="100vw"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/1200x600/1e1b4b/ffffff?text=Project+Image';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none z-10" />
            {project.featured && (
              <div className="absolute top-4 right-4 bg-yellow-500/90 text-black text-xs font-bold px-3 py-1 rounded-full z-20">
                FEATURED
              </div>
            )}
            <div className="absolute bottom-6 left-6 z-20">
              <span className="px-3 py-1 bg-purple-500/80 rounded-full text-white text-sm">
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {project.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(project.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{project.category}</span>
              </div>
            </div>

            {/* Full Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">About This Project</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </div>

            {/* Full Tech Stack */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 rounded-lg text-white hover:bg-gray-800 transition"
              >
                <FaGithub className="w-5 h-5" />
                View Source Code
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white hover:opacity-90 transition"
              >
                <FaExternalLinkAlt className="w-5 h-5" />
                Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
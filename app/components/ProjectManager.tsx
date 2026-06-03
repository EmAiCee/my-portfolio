"use client";

import { useState, useEffect } from 'react';

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

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tech: '',
    github: '',
    live: '',
    category: 'fullstack',
    featured: false,
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      tech: formData.tech.split(',').map(t => t.trim()),
    };

    const res = await fetch('/api/projects', {
      method: editing ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(editing ? { id: editing._id, ...projectData } : projectData),
    });

    if (res.ok) {
      fetchProjects();
      setFormData({ title: '', description: '', image: '', tech: '', github: '', live: '', category: 'fullstack', featured: false });
      setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchProjects();
    }
  };

  const handleEdit = (project: Project) => {
    setEditing(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tech: project.tech.join(', '),
      github: project.github,
      live: project.live,
      category: project.category,
      featured: project.featured,
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          {editing ? 'Edit Project' : 'Add New Project'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50"
            rows={3}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50"
            required
          />
          <input
            type="text"
            placeholder="Technologies (comma separated)"
            value={formData.tech}
            onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50"
            required
          />
          <input
            type="text"
            placeholder="GitHub URL"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50"
            required
          />
          <input
            type="text"
            placeholder="Live Demo URL"
            value={formData.live}
            onChange={(e) => setFormData({ ...formData, live: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50"
            required
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
          >
            <option value="fullstack">Full Stack</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="devops">DevOps</option>
          </select>
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            />
            Featured Project
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold"
            >
              {editing ? 'Update' : 'Create'} Project
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setFormData({ title: '', description: '', image: '', tech: '', github: '', live: '', category: 'fullstack', featured: false });
                }}
                className="px-6 py-2 bg-gray-500 rounded-lg text-white font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Your Projects</h2>
        <div className="space-y-2">
          {projects.map((project) => (
            <div key={project._id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <div>
                <h3 className="text-white font-semibold">{project.title}</h3>
                <p className="text-gray-400 text-sm">{project.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-3 py-1 bg-blue-500 rounded text-white text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-3 py-1 bg-red-500 rounded text-white text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
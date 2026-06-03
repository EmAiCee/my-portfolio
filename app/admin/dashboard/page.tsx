"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectManager from '@/app/components/ProjectManager';
import MessageManager from '@/app/components/MessageManager';
import SessionTimeout from '@/app/components/SessionTimeout';
import { LogOut, FolderGit2, MessageSquare, Shield, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'projects' | 'messages'>('projects');
  const [adminName, setAdminName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();
      
      console.log('Dashboard auth check:', data);
      
      if (!data.authenticated) {
        console.log('Not authenticated, redirecting');
        router.replace('/admin/login');
        return;
      }
      
      if (data.user) {
        setAdminName(data.user.name || 'Admin');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Auth check error:', error);
      router.replace('/admin/login');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.replace('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      router.replace('/admin/login');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SessionTimeout />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        {/* Navbar */}
        <nav className="bg-black/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-gray-300 text-sm hidden sm:block">
                  Welcome, <span className="text-purple-400 font-semibold">{adminName}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <FolderGit2 className="w-5 h-5" />
              Manage Projects
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'messages'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              View Messages
            </button>
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'projects' && <ProjectManager />}
            {activeTab === 'messages' && <MessageManager />}
          </motion.div>
        </div>
      </div>
    </>
  );
}
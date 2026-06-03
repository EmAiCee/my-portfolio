"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogIn, Shield, Code2, Sparkles } from 'lucide-react';

export default function AdminIndex() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-300">Manage your portfolio content</p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { icon: Code2, label: "Manage Projects", color: "purple" },
              { icon: Sparkles, label: "View Messages", color: "pink" },
            ].map((feature, idx) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-${feature.color}-500/10 border border-${feature.color}-500/30 rounded-xl p-3 text-center`}
              >
                <feature.icon className={`w-6 h-6 text-${feature.color}-400 mx-auto mb-1`} />
                <p className="text-white text-sm font-medium">{feature.label}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="space-y-4">
            {isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/admin/dashboard')}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                <LayoutDashboard className="w-5 h-5" />
                Go to Dashboard
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/admin/login')}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                <LogIn className="w-5 h-5" />
                Login to Admin
              </motion.button>
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs mt-6">
            Secure access only for authorized personnel
          </p>
        </div>
      </motion.div>
    </div>
  );
}
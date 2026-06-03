"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Clock } from 'lucide-react';

export default function SessionTimeout() {
  const router = useRouter();
  const pathname = usePathname();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute warning
  let inactivityTimer: NodeJS.Timeout;
  let warningTimer: NodeJS.Timeout;

  const resetTimer = () => {
    // Clear existing timers
    if (inactivityTimer) clearTimeout(inactivityTimer);
    if (warningTimer) clearTimeout(warningTimer);
    setShowWarning(false);
    
    // Set new inactivity timer (25 minutes)
    inactivityTimer = setTimeout(() => {
      setShowWarning(true);
      startCountdown();
    }, 25 * 60 * 1000);
  };
  
  const startCountdown = () => {
    let countdown = 60;
    warningTimer = setInterval(() => {
      countdown--;
      setTimeLeft(countdown);
      
      if (countdown <= 0) {
        clearInterval(warningTimer);
        logout();
      }
    }, 1000);
  };
  
  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('token'); // Clean up any remaining localStorage
    router.push('/admin/login?session=expired');
  };
  
  const stayLoggedIn = () => {
    setShowWarning(false);
    resetTimer();
  };
  
  useEffect(() => {
    // Only run on admin pages
    if (!pathname.includes('/admin')) return;
    
    resetTimer();
    
    // Set up event listeners for user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      if (inactivityTimer) clearTimeout(inactivityTimer);
      if (warningTimer) clearTimeout(warningTimer);
    };
  }, [pathname]);
  
  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-xl shadow-2xl border border-purple-500/50 p-6 max-w-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Session Timeout Warning</h3>
                <p className="text-gray-300 text-sm mb-3">
                  You will be automatically logged out in <span className="text-yellow-400 font-bold">{timeLeft}</span> seconds due to inactivity.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={stayLoggedIn}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition"
                  >
                    Stay Logged In
                  </button>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-gray-700 rounded-lg text-white text-sm font-semibold hover:bg-gray-600 transition flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
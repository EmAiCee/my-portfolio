"use client";

import { useEffect, useState } from 'react';

export default function CookieTest() {
  const [cookieVisible, setCookieVisible] = useState(false);

  useEffect(() => {
    // Try to read cookies via JavaScript
    const cookies = document.cookie;
    setCookieVisible(cookies.includes('token'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="bg-white/10 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Cookie Security Test</h1>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${cookieVisible ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
            <p className="text-white font-semibold">Token visible via JavaScript:</p>
            <p className={cookieVisible ? 'text-red-400' : 'text-green-400'}>
              {cookieVisible ? '❌ FAILED - Token is accessible!' : '✅ PASSED - Token is HttpOnly and secure!'}
            </p>
          </div>
          
          <div className="bg-blue-500/20 p-4 rounded-lg">
            <p className="text-white text-sm">Check DevTools → Application → Cookies:</p>
            <p className="text-gray-300 text-sm mt-2">
              The 'token' cookie should have ✓ in the HttpOnly column
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
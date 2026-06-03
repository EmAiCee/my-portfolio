"use client";

import { useState, useEffect } from 'react';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessageManager() {
  const [messages, setMessages] = useState<Message[]>([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await fetch('/api/messages', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await res.json();
    setMessages(data);
  };

  const markAsRead = async (id: string, read: boolean) => {
    await fetch('/api/messages', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id, read: !read }),
    });
    fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    if (confirm('Delete this message?')) {
      await fetch(`/api/messages?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchMessages();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Contact Messages</h2>
      <div className="space-y-3">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`p-4 rounded-lg ${message.read ? 'bg-white/5' : 'bg-purple-500/20 border border-purple-500'}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-semibold">{message.name}</h3>
                <p className="text-gray-400 text-sm">{message.email}</p>
                <p className="text-gray-300 mt-2">{message.message}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => markAsRead(message._id, message.read)}
                  className={`px-3 py-1 rounded text-white text-sm ${
                    message.read ? 'bg-gray-500' : 'bg-green-500'
                  }`}
                >
                  {message.read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button
                  onClick={() => deleteMessage(message._id)}
                  className="px-3 py-1 bg-red-500 rounded text-white text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-gray-400 text-center py-8">No messages yet</p>
        )}
      </div>
    </div>
  );
}
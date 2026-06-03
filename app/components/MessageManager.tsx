"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, Trash2, Eye, EyeOff, Inbox } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/messages');
      
      if (!res.ok) {
        if (res.status === 401) {
          setError('Authentication failed. Please login again.');
          return;
        }
        throw new Error('Failed to fetch messages');
      }
      
      const data = await res.json();
      setMessages(data);
      setError('');
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string, read: boolean) => {
    try {
      await fetch('/api/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: !read }),
      });
      fetchMessages();
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (confirm('Delete this message?')) {
      try {
        await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
        fetchMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchMessages}
            className="mt-4 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Contact Messages ({messages.length})</h3>
        <Mail className="w-5 h-5 text-purple-400" />
      </div>
      
      {messages.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-400">No messages yet</p>
          <p className="text-gray-500 text-sm mt-2">Messages from your contact form will appear here</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {messages.map((message, index) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-lg transition-all ${
                message.read 
                  ? 'bg-white/5 hover:bg-white/10' 
                  : 'bg-purple-500/20 border border-purple-500/50 hover:bg-purple-500/30'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h4 className="text-white font-semibold">{message.name}</h4>
                    <span className="text-gray-400 text-sm">{message.email}</span>
                    <span className="text-gray-500 text-xs">
                      {new Date(message.createdAt).toLocaleString()}
                    </span>
                    {!message.read && (
                      <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm">{message.message}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => markAsRead(message._id, message.read)}
                    className={`p-2 rounded-lg transition ${
                      message.read 
                        ? 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30' 
                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    }`}
                    title={message.read ? "Mark as unread" : "Mark as read"}
                  >
                    {message.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => deleteMessage(message._id)}
                    className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
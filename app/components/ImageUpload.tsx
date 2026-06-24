"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
}

export default function ImageUpload({ onImageUploaded, currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [error, setError] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    setUploading(true);
    setError('');

    // Show local preview
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        onImageUploaded(data.url);
        setError('');
      } else {
        setError(data.error || 'Upload failed');
        setPreview(currentImage || '');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload failed. Please try again.');
      setPreview(currentImage || '');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview('');
    onImageUploaded('');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        Project Image
      </label>
      
      {!preview ? (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative"
        >
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-purple-400 transition" />
                  <p className="mt-2 text-sm text-gray-400">
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </motion.div>
      ) : (
        <div className="relative group">
          <div className="relative h-40 rounded-xl overflow-hidden">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <label className="px-3 py-1.5 bg-purple-500 rounded-lg text-white text-sm cursor-pointer hover:bg-purple-600 transition">
                Change
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              <button
                onClick={removeImage}
                className="px-3 py-1.5 bg-red-500 rounded-lg text-white text-sm hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
          )}
        </div>
      )}
      
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
}
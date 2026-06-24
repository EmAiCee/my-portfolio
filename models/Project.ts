import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  cloudinaryId: { type: String },
  tech: [{ type: String }],
  github: { type: String, required: true },
  live: { type: String, required: true },
  category: { type: String, enum: ['fullstack', 'frontend', 'backend', 'devops'], required: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
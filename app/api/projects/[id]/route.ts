import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Project from '@/models/Project';
import mongoose from 'mongoose';

// GET - Fetch single project by ID (PUBLIC - no auth required)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Await params (required in Next.js 15+)
    const { id } = await params;
    
    console.log('📦 Fetching project with ID:', id);
    
    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('❌ Invalid ObjectId:', id);
      return NextResponse.json({ error: 'Invalid project ID format' }, { status: 400 });
    }
    
    await connectDB();
    const project = await Project.findById(id);
    
    if (!project) {
      console.log('❌ Project not found:', id);
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    console.log('✅ Project found:', project.title);
    return NextResponse.json(project);
  } catch (error) {
    console.error('❌ Fetch project error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
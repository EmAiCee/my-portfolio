import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Project from '@/models/Project';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { projectSchema } from '@/lib/validation';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper to verify auth
async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  
  if (!token) {
    return null;
  }
  
  try {
    return jwt.verify(token.value, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// GET - Fetch all projects (public)
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Fetch projects error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new project (protected)
export async function POST(request: Request) {
  try {
    const user = await verifyAuth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    console.log('📝 Received project data:', JSON.stringify(body, null, 2));
    
    // Validate with Zod
    const validation = projectSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }));
      
      console.log('❌ Validation errors:', JSON.stringify(errors, null, 2));
      
      return NextResponse.json(
        { 
          error: errors[0]?.message || 'Invalid project data',
          details: errors 
        },
        { status: 400 }
      );
    }
    
    console.log('✅ Validation passed, creating project...');
    const project = await Project.create(validation.data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update project (protected)
export async function PUT(request: Request) {
  try {
    const user = await verifyAuth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const { id, ...updates } = body;
    
    // Validate with Zod
    const validation = projectSchema.safeParse(updates);
    if (!validation.success) {
      const errors = validation.error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }));
      
      return NextResponse.json(
        { 
          error: errors[0]?.message || 'Invalid project data',
          details: errors 
        },
        { status: 400 }
      );
    }
    
    const project = await Project.findByIdAndUpdate(
      id, 
      validation.data, 
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete project (protected)
export async function DELETE(request: Request) {
  try {
    const user = await verifyAuth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }
    
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
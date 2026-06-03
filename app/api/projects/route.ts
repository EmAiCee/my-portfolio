import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Project from '@/models/Project';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// GET - Fetch all projects
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
    // Verify token
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    jwt.verify(token, JWT_SECRET);

    await connectDB();
    const body = await request.json();
    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update project (protected)
export async function PUT(request: Request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    jwt.verify(token, JWT_SECRET);

    await connectDB();
    const { id, ...updates } = await request.json();
    const project = await Project.findByIdAndUpdate(id, updates, { new: true });
    return NextResponse.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete project (protected)
export async function DELETE(request: Request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    jwt.verify(token, JWT_SECRET);

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
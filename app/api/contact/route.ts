import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Message from '@/models/Message';
import nodemailer from 'nodemailer';

// Configure nodemailer with better settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: true, // Enable logging
  debug: true, // Enable debug output
});

export async function POST(request: Request) {
  try {
    await connectDB();
    const { name, email, message } = await request.json();

    console.log('📨 Received contact form submission:', { name, email });

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to database
    const newMessage = await Message.create({ name, email, message });
    console.log('💾 Message saved to database:', newMessage._id);

    // Verify email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Email credentials missing!');
      return NextResponse.json(
        { message: 'Message saved but email notification failed' },
        { status: 200 }
      );
    }

    // 1. Send notification email to ADMIN
    console.log('📧 Sending admin notification to:', process.env.ADMIN_EMAIL);
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `📬 New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">✨ New Contact Message ✨</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 10px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px;">${message}</p>
          </div>
          <hr />
          <p style="color: #6b7280; font-size: 12px;">Message ID: ${newMessage._id}</p>
          <p style="color: #6b7280; font-size: 12px;">Sent from your portfolio website</p>
          <p style="color: #6b7280; font-size: 12px;">Login to admin dashboard to reply: http://localhost:3000/admin/login</p>
        </div>
      `,
    });
    console.log('✅ Admin notification sent');

    // 2. Send AUTO-REPLY to USER
    console.log('📧 Sending auto-reply to user:', email);
    await transporter.sendMail({
      from: `"Musa Algoni" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for contacting me, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed, #ec4899); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">✨ Message Received ✨</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; color: #1f2937;">Dear ${name},</p>
            <p style="color: #4b5563; line-height: 1.6;">Thank you for reaching out to me. I have received your message and will get back to you as soon as possible .</p>
            
          
            
            <div style="background: #e0e7ff; padding: 15px; border-radius: 10px; margin: 20px 0;">
              <p style="color: #4338ca; margin: 0; font-size: 14px;">📞 In the meantime, you can reach me at: <strong>algonimusa202@gmail.com</strong></p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            
            <p style="color: #9ca3af; font-size: 12px; text-align: center;">Best regards,<br />Musa Algoni<br /> Software Engineer</p>
          </div>
        </div>
      `,
    });
    console.log('✅ Auto-reply sent to user');

    return NextResponse.json(
      { message: 'Message sent successfully!', id: newMessage._id },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
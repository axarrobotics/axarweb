import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    });

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          { message: 'Email is already subscribed' },
          { status: 200 }
        );
      } else {
        // Reactivate subscription
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { isActive: true, subscribedAt: new Date() }
        });
      }
    } else {
      // Create new subscription
      await prisma.newsletterSubscriber.create({
        data: { email }
      });
    }

    // Send welcome email
    if (resend) {
      await resend.emails.send({
        from: 'Axar Robotics <contact@axarrobotics.com>',
        to: [email],
        subject: 'Welcome to Axar Robotics Newsletter! 🤖',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e293b 0%, #1e40af 50%, #1e293b 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">
                Welcome to <span style="color: #60a5fa;">Axar Robotics</span>!
              </h1>
            </div>
            
            <div style="padding: 40px 20px; background: #f8fafc;">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Thank you for subscribing! 🎉</h2>
              
              <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
                You're now part of the Axar Robotics community! We're excited to share updates about our revolutionary multimodal AI robot designed to entertain and train dogs.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e40af; margin-top: 0;">What to expect:</h3>
                <ul style="color: #475569; line-height: 1.6;">
                  <li>🚀 Product launch updates and early access</li>
                  <li>🤖 Behind-the-scenes AI development insights</li>
                  <li>🐕 Dog training tips and pet care advice</li>
                  <li>📱 Exclusive features and beta testing opportunities</li>
                </ul>
              </div>
              
              <p style="color: #475569; line-height: 1.6;">
                Stay tuned for exciting updates as we revolutionize pet technology!
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://axarrobotics.com" style="background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Visit Our Website
                </a>
              </div>
            </div>
            
            <div style="background: #1e293b; padding: 20px; text-align: center;">
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                © 2024 Axar Robotics. All rights reserved.
              </p>
              <p style="color: #64748b; margin: 10px 0 0 0; font-size: 12px;">
                You can unsubscribe at any time by replying to this email.
              </p>
            </div>
          </div>
        `
      });
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

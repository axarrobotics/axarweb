import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const { subject, content, htmlContent } = await request.json();

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Subject and content are required' },
        { status: 400 }
      );
    }

    // Get all active subscribers
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { isActive: true },
      select: { email: true }
    });

    if (subscribers.length === 0) {
      return NextResponse.json(
        { message: 'No active subscribers found' },
        { status: 200 }
      );
    }

    const emailAddresses = subscribers.map(sub => sub.email);

    // Send newsletter to all subscribers
    if (resend) {
      await resend.emails.send({
        from: 'Axar Robotics <contact@axarrobotics.com>',
        to: emailAddresses,
        subject: subject,
        text: content,
        html: htmlContent || `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e293b 0%, #1e40af 50%, #1e293b 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">
                <span style="color: #60a5fa;">Axar Robotics</span> Newsletter
              </h1>
            </div>
            
            <div style="padding: 40px 20px; background: #f8fafc;">
              <div style="color: #1e293b; line-height: 1.6;">
                ${content.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="background: #1e293b; padding: 20px; text-align: center;">
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                © 2024 Axar Robotics. All rights reserved.
              </p>
            </div>
          </div>
        `
      });
    }

    return NextResponse.json(
      { 
        message: `Newsletter sent to ${subscribers.length} subscribers`,
        subscriberCount: subscribers.length 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      { error: 'Failed to send newsletter' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve subscriber count
export async function GET() {
  try {
    const count = await prisma.newsletterSubscriber.count({
      where: { isActive: true }
    });

    return NextResponse.json({ subscriberCount: count });
  } catch (error) {
    console.error('Error getting subscriber count:', error);
    return NextResponse.json(
      { error: 'Failed to get subscriber count' },
      { status: 500 }
    );
  }
}

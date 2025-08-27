import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Enable debug logging
console.log('Resend API Key exists:', !!process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    const { email } = body;

    if (!email) {
      console.error('No email provided in request');
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('Attempting to send email to:', email);
    
    // Send email using Resend
    const emailData = {
      from: 'CSSure <send@cssure.online>',
      to: email,
      subject: 'Welcome to CSSure Waitlist!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #21323B;">Thank you for joining CSSure waitlist! 🎉</h2>
          <p>We're excited to have you on board. We'll notify you as soon as we launch our email validation tool.</p>
          <p>In the meantime, feel free to reply to this email if you have any questions.</p>
          <p>Best regards,<br>The CSSure Team</p>
        </div>
      `,
    };

    console.log('Sending email with data:', emailData);
    
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    
    return NextResponse.json({ 
      message: 'Successfully joined waitlist!',
      data 
    });

  } catch (error) {
    console.error('Error processing subscription:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process subscription' },
      { status: 500 }
    );
  }
}

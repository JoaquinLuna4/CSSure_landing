import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

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
    
    // Save email to Supabase
    const { data: insertData, error: insertError } = await supabase
      .from('Suscribers')
      .insert([{ email }]);

    if (insertError) {
      console.error('Error saving email to Supabase:', insertError);
      return NextResponse.json(
        { error: 'Failed to save email' },
        { status: 500 }
      );
    }
    
    console.log('Email saved to Supabase:', insertData);
    
    // Send email using Resend
    const emailData = {
      from: 'CSSure <no-reply@cssure.online>',
      to: email,
      subject: 'Welcome to CSSure Waitlist!',
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to the CSSure Waitlist!</title>
    <style type="text/css">
        body { margin: 0; padding: 0; min-width: 100%; background-color: #f4f4f9; }
        table { border-spacing: 0; font-family: sans-serif; color: #333333; }
        td { padding: 0; }
        img { border: 0; }
        .wrapper { width: 100%; table-layout: fixed; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        .main-content { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header-bg { background-color: #21323B; padding: 20px 0; border-radius: 8px 8px 0 0; }
        .content-padding { padding: 20px 40px; }

        @media only screen and (max-width: 600px) {
            .main-content { max-width: 100% !important; border-radius: 0; }
            .content-padding { padding: 20px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; min-width: 100%; background-color: #f4f4f9;">
    <center class="wrapper" style="width: 100%; table-layout: fixed; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
        <div class="webkit" style="max-width: 600px;">
            <table class="outer" align="center" style="border-spacing: 0; font-family: sans-serif; color: #333333; width: 100%; max-width: 600px;">
                <tr>
                    <td class="main-content" style="padding: 0; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <table width="100%" style="border-spacing: 0;">
                            <tr>
                                <td class="header-bg" style="padding: 20px 0; background-color: #21323B; border-radius: 8px 8px 0 0;">
                                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; text-align: center;">Welcome to CSSure! 🎉</h1>
                                </td>
                            </tr>
                            <tr>
                                <td class="content-padding" style="padding: 20px 40px;">
                                    <h2 style="color: #21323B; margin-top: 0; font-size: 22px;">You're In!</h2>
                                    <p style="color: #555555; line-height: 1.6;">Thank you for joining our waitlist. We've reserved your spot and will notify you as soon as our email validation tool is ready for launch.</p>
                                    <p style="color: #555555; line-height: 1.6;">As one of our first users, you'll get <strong>exclusive access to a lifetime discount</strong> on the service.</p>
                                    <p style="color: #555555; line-height: 1.6;">This is an automated email. Please do not reply.</p>
                                    <p style="color: #777777; margin-top: 30px; font-size: 14px;">Best regards,<br>The CSSure Team</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>
</html>
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

import { NextRequest, NextResponse } from 'next/server';
import { getResendClient } from '@/lib/resend';

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  projectType?: string;
  turnstileToken?: string;
  honeypot?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { name, email, phone, message, projectType, turnstileToken, honeypot } = body;

    // Honeypot check - silently accept to fool bots
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Turnstile verification (if configured)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && turnstileToken) {
      const turnstileResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: turnstileToken,
          }),
        }
      );
      const turnstileResult = await turnstileResponse.json();
      if (!turnstileResult.success) {
        return NextResponse.json(
          { error: 'Security verification failed. Please try again.' },
          { status: 403 }
        );
      }
    }

    // Send email via Resend
    try {
      const resend = getResendClient();

      await resend.emails.send({
        from: 'Koviak Built Website <noreply@koviakbuilt.com>',
        to: ['sales@koviakbuilt.com'],
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #1a1a1a; padding: 24px; border-bottom: 3px solid #b87333;">
              <h1 style="color: #b87333; font-size: 24px; margin: 0;">New Contact Form Submission</h1>
            </div>
            <div style="padding: 24px; background-color: #f9f9f9;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #555;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                  <td style="padding: 8px 0; color: #555;">
                    <a href="mailto:${escapeHtml(email)}" style="color: #b87333;">${escapeHtml(email)}</a>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
                  <td style="padding: 8px 0; color: #555;">
                    <a href="tel:${escapeHtml(phone)}" style="color: #b87333;">${escapeHtml(phone)}</a>
                  </td>
                </tr>
                ` : ''}
                ${projectType ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Project Type:</td>
                  <td style="padding: 8px 0; color: #555;">${escapeHtml(projectType)}</td>
                </tr>
                ` : ''}
              </table>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
              <h3 style="color: #333; margin-bottom: 8px;">Message:</h3>
              <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
            <div style="padding: 16px 24px; background-color: #1a1a1a; text-align: center;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Sent from koviakbuilt.com contact form
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't expose internal errors to the client
      return NextResponse.json(
        { error: 'Failed to send message. Please try again or call us directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

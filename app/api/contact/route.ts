import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  // Debug environment variables (safely)
  console.log('Environment Variables Status:', {
    EMAIL_TO: !!process.env.EMAIL_TO,
    EMAIL_FROM: !!process.env.EMAIL_FROM,
    EMAIL_PASSWORD: !!process.env.EMAIL_PASSWORD,
  });

  // Check if environment variables are set
  if (!process.env.EMAIL_TO || !process.env.EMAIL_FROM || !process.env.EMAIL_PASSWORD) {
    console.error('Missing environment variables:', {
      EMAIL_TO: !!process.env.EMAIL_TO,
      EMAIL_FROM: !!process.env.EMAIL_FROM,
      EMAIL_PASSWORD: !!process.env.EMAIL_PASSWORD,
    });
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const usernameTo = process.env.EMAIL_TO;
  const username = process.env.EMAIL_FROM;
  const password = process.env.EMAIL_PASSWORD;

  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const phone = formData.get("phone");
    const message = formData.get("message");

    // Validate required fields
    if ( !phone) {
      return NextResponse.json(
        { error: "Телефон обов'язковий!" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: username,
        pass: password,
      },
    });

    // Verify SMTP connection configuration
    try {
      await transporter.verify();
    } catch (error) {
      console.error('SMTP Verification Error:', error);
      return NextResponse.json(
        { error: "Помилка конфігурації email сервісу" },
        { status: 500 }
      );
    }

    const mailOptions = {
      from: username,
      to: usernameTo,
      replyTo: username,
      subject: `Нове повідомлення - Cherry Lips`,
      html: `
        <h2>Нове повідомлення з форми контактів</h2>
        <p><strong>Ім'я:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        ${message ? `
          <p><strong>Повідомлення:</strong></p>
          <p>${message}</p>
        ` : ''}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json(
        { message: "Повідомлення успішно надіслано" },
        { status: 200 }
      );
    } catch (error) {
      console.error('Send Mail Error:', error);
      return NextResponse.json(
        { error: "Не вдалося надіслати повідомлення" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('General Error:', error);
    return NextResponse.json(
      { error: "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }
} 
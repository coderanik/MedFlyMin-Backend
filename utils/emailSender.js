import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("Email Credentials check :");
console.log("EMAIL HOST exists:", process.env.EMAIL_HOST);
console.log("EMAIL PASS Exists:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("Error in email credentials", error);
  } else {
    console.log("Email credentials are correct", success);
  }
});

export const welcomeEmail = async (to, name) => {
  if (!to || !name) {
    throw new Error("Email or username not Provided");
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Welcome to Medflymin</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .email-container { max-width: 600px; margin: 40px auto; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden; }
        .header { background-color: #F2630A; color: white; padding: 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .tagline { font-size: 14px; margin-top: 5px; color: #d9f0f2; }
        .content { padding: 30px; font-size: 16px; color: #333; line-height: 1.6; }
        .footer { background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #888; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Welcome to MedflyMin</h1>
          <div class="tagline">Get Medicine Delivered in minutes</div>
        </div>
        <div class="content">
          <p>Hello <strong>${name}</strong>,</p>
          <p>Welcome to our community! We’re thrilled to have you here.</p>
          <p>We're excited to help you on your health journey. Let us know if you need anything!</p>

        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Medflymin. All rights reserved.
        </div>
      </div>
    </body>
    </html>`;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: "Welcome to our MedFlymin",
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully", info.messageId);
    return info;
  } catch (error) {
    console.error("Error Sending email", error);
    return error;
  }
};

export const pharmacistWelcomeEmail = async (to, ownerName, pharmacyName) => {
  if (!to || !ownerName || !pharmacyName) {
    throw new Error("Email, pharmacist name, or pharmacy name not provided");
  }

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome Pharmacist</title>
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background-color: #fafafa;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        overflow: hidden;
      }
      .header {
        background-color: #F2630A;
        color: #ffffff;
        padding: 25px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: bold;
      }
      .tagline {
        font-size: 14px;
        margin-top: 6px;
        color: #ffe9d6; /* lighter orange-tint for better visibility */
      }
      .content {
        padding: 30px;
        font-size: 16px;
        color: #333333;
        line-height: 1.6;
      }
      .highlight {
        color: #F2630A;
        font-weight: 600;
      }
      .footer {
        background-color: #f5f5f5;
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #777777;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Welcome to MedflyMin</h1>
        <div class="tagline">Empowering Pharmacies. Delivering Health.</div>
      </div>
      <div class="content">
        <p>Dear <strong>${ownerName}</strong>,</p>
        <p>Thank you for registering your pharmacy, <strong class="highlight">${pharmacyName}</strong>, with <strong>MedflyMin</strong>.</p>
        <p>We're thrilled to welcome you to our healthcare network dedicated to fast, reliable, and accessible medicine delivery.</p>
        <p>You can now access your dashboard to manage inventory, track orders, and grow your customer base.</p>
        <p>Let’s make healthcare better, together.</p>
        <p>Warm regards,<br/>The MedflyMin Team</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} MedflyMin. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
  

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: "Welcome to MedflyMin – Partner Onboarding",
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Pharmacist welcome email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending pharmacist email:", error);
    return error;
  }
};

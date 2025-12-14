// api/sendMail.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullName, email,program,serviceType, fitnessGoal, } = req.body;

  try {
    // Gmail SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "mustafaprogrammer786@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Determine email subject and content based on what form was submitted
    let subject;
    let htmlContent;

    if (program) {
      // Program enrollment form
      subject = `New Program Enrollment: ${program}`;
      htmlContent = `
        <h2>New Program Enrollment</h2>
        <p><b>Program:</b> ${program}</p>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
       
        <p><b>Goals:</b> ${goals}</p>
        
        <hr>
        <p><i>This is a program enrollment submission from Noah's Aesthetics website</i></p>
      `;
    } else {
      // Contact form
      subject = "New Contact Form Submission - Noah's Aesthetics";
      htmlContent = `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Service Interested In:</b> ${serviceType}</p>
        <p><b>Fitness Goal:</b> ${fitnessGoal}</p>
        <hr>
        <p><i>This is a contact form submission from Noah's Aesthetics website</i></p>
      `;
    }

    await transporter.sendMail({
      from: `"Noah's Aesthetics Website" <Noahroper16@gmail.com>`,
      to: "Noahroper16@gmail.com",
      subject: subject,
      html: htmlContent,
    });

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: err.message });
  }
}

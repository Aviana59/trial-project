require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

app.post("/invite", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Email and name are required" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const token = crypto.randomBytes(32).toString("hex"); // Generate a secure token
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        role: "WRITER",
        inviteToken: token, // Save token in the database
        inviteTokenExpiry: new Date(Date.now() + 3600000), // Token valid for 1 hour
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const inviteLink = `http://localhost:3000/register?token=${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "You're invited to join as a Writer",
      text: `Hi ${name},\n\nYou've been invited to join our platform as a Writer. Click the link below to set up your account:\n\n${inviteLink}\n\nThank you!`,
    });

    res.status(200).json({ message: "Invitation sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

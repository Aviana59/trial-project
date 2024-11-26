import { PrismaClient } from '@prisma/client';
import EmailService from '../services/EmailService.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const inviteWriter = async (req, res) => {
  try {
    const { email } = req.body;

    // Validasi input
    if (!email) {
      return res.status(400).send({ error: 'Email harus disertakan' });
    }

    // Temukan admin
    const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    if (!admin) {
      return res.status(404).send({ error: 'Admin tidak ditemukan' });
    }

    // Buat undangan
    const invitation = await prisma.invitation.create({
      data: {
        email,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Valid 24 jam
        invitedBy: admin.id,
      },
    });

    // Buat link undangan
    //sesuaikan dengan url backend saat ini
    const invitationLink = `http://localhost:3001/accept-invitation/${invitation.id}`;

    // Kirim email
    await EmailService.sendInvitationEmail(email, invitationLink);

    res.status(200).send({ message: 'Undangan telah dikirim!', invitationLink });
  } catch (error) {
    console.error('[ERROR inviteWriter]:', error);
    res.status(500).send({ error: 'Terjadi kesalahan pada server' });
  }
};

export const acceptInvitation = async (req, res) => {
  try {
    const { invitationId } = req.params;
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).send({ error: 'Email dan password harus disertakan' });
    }

    // Cek undangan
    const invitation = await prisma.invitation.findUnique({
      where: { id: Number(invitationId) },
    });

    if (!invitation || new Date() > invitation.expiresAt) {
      return res.status(400).send({ error: 'Undangan tidak valid atau sudah kadaluarsa' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'WRITER',
        // invitedBy: invitation.invitedBy,
        name: 'uh'
      },
    });

    // Hapus undangan
    await prisma.invitation.delete({ where: { id: invitation.id } });

    res.status(200).send({ message: 'Registrasi berhasil!', user });
  } catch (error) {
    console.error('[ERROR acceptInvitation]:', error);
    res.status(500).send({ error: 'Terjadi kesalahan pada server' });
  }
};

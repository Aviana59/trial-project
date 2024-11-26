import express from 'express';
import * as InviteController from '../controllers/inviteController.js';
import jwtMiddleware from '../middleware/jwtMiddleware.js'; // Middleware autentikasi
import { checkRole } from '../middleware/checkRole.js'; // Middleware otorisasi
import {validateInvite} from '../middleware/validateInvite.js'; // Middleware validasi input

const router = express.Router();

// Rute admin untuk mengirim undangan
router.post(
    '/admin/invite',
    jwtMiddleware,             // Periksa autentikasi (token JWT)
    checkRole(['admin']),      // Hanya ADMIN yang diizinkan
    validateInvite,            // Validasi input email
    InviteController.inviteWriter // Logika utama
);

// Rute untuk menerima undangan
router.post(
    '/accept-invitation/:invitationId',
    InviteController.acceptInvitation // Tidak perlu otorisasi karena ini rute umum
);

export default router;
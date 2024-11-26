import jwt from 'jsonwebtoken';

const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Ambil token dari header
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key'); // Verifikasi token
        req.user = decoded; // Simpan informasi pengguna ke req.user
        next(); // Lanjut ke middleware berikutnya
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export default jwtMiddleware;
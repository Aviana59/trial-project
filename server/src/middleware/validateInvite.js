export const validateInvite = (req, res, next) => {
    const { email } = req.body;

    // Periksa apakah email ada dan dalam format valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    next(); // Lanjutkan ke controller jika validasi lolos
};

// export default validateInvite;

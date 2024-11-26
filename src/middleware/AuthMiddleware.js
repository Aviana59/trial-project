import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthMiddleware = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah ada data user di localStorage
    const user = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    
    if (!user || !token) {
      // Jika tidak ada user atau token, arahkan ke halaman login
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(user);
      // Jika user ada, cek apakah dia admin
      if (parsedUser.role !== 'admin') {
        // Jika role bukan admin, arahkan ke halaman lain (misalnya homepage)
        navigate('/home');
      }
    }
  }, [navigate]);
};

export default useAuthMiddleware;

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminDashboardGuard = ({ children }) => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("AuthState", authState);
    // Cek peran dan arahkan pengguna ke dashboard yang sesuai
    try {
      if (
        !authState ||
        !authState.user ||
        !authState.user.role ||
        authState.user.role !== 'admin'
      ) {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      navigate('/signin?message=Unauthorized');
    }
  }, [navigate, authState]);

  return <>{children}</>;
}

export default AdminDashboardGuard;
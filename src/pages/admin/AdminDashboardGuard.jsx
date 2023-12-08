import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminDashboardGuard = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Cek peran dan arahkan pengguna ke dashboard yang sesuai
    if (!user || user.role !== 'admin') {
      navigate('/signin?message=Unauthorized');
    }
  }, [navigate, user]);

  return <>{children}</>;
};

export default AdminDashboardGuard;

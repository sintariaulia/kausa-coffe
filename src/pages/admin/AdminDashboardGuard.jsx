import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminDashboardGuard = ({ children }) => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  useEffect(() => {
    // Cek peran dan arahkan pengguna ke dashboard yang sesuai
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      if (!authState || !authState.user || !authState.user.role || authState.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      // Tambahkan penanganan ketika token tidak ditemukan atau pengguna tidak diotorisasi
      if (error.message === "Token not found") {
        console.log("Token Not Found")
      } else {
        navigate("/signin?message=Unauthorized");
      }
    }
  }, [navigate, authState, token]);

  return <>{children}</>;

};


export default AdminDashboardGuard;
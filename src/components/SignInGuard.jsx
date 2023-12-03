import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginGuard = ({ children }) => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    // Cek peran dan arahkan pengguna ke dashboard yang sesuai
    try {
      if (!authState || authState.isLogin === false) {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      navigate("/signin?message=Unauthorized");
    }
  }, [navigate, authState]);

  return <>{children}</>;
};

export default LoginGuard;

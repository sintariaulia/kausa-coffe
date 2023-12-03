import React from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchUser } from './services/authSlice';
import './App.css';
import IndexRouter from './routers';

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const initializeApp = async () => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       await dispatch(fetchUser(token));
  //     }
  //     // ... kode lainnya yang ingin Anda jalankan saat inisialisasi aplikasi
  //   };

  //   initializeApp();
  // }, [dispatch]);

  return (
    <IndexRouter />
  );
}

export default App;
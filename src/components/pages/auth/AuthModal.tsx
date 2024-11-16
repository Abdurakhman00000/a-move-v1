"use client";

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import scss from "./AuthModal.module.scss";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";

const AuthModal = () => {
  const { isOpen, closeModal } = useAuthStore();

  if (!isOpen) return null;
  if (status === 'loading') {
    return <div>Loading...</div>; 
  }

  return (
    <div className={scss.modal}>
      <div className={scss.modalContent}>
        <button onClick={closeModal} className={scss.closeButton}>X</button>
        
          <div className={scss.Login}>
            <div className={scss.login_info}>
              <BiSolidMoviePlay />
              <h2>A move</h2>
            </div>
            <h2>Hello</h2>
            <button><FcGoogle /> Sign in with Google</button>
          </div>
      </div>
    </div>
  );
};

export default AuthModal;

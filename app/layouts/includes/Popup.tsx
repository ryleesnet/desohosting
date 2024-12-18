"use client"

import { useGeneralStore } from '@/app/stores/general';
import React, { useState, useEffect } from 'react';


interface PopupProps {
  children: React.ReactNode;
}

function Popup({ children }: PopupProps) {

    const isVisible = useGeneralStore((store) => store.isVisible)
    const setIsVisible = useGeneralStore((store) => store.setIsVisible)
    const currency = useGeneralStore((store) => store.currency)

  // Handle closing the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!document.getElementById('popup-container')?.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown',   
 handleClickOutside);
    };
  }, []);

  return (
    <div

      id="popup-container"
      className={`popup ${isVisible ? 'show' : ''} bg-slate-900/80 fixed top-1/2 right-1/2 -translate-x-[-50%] translate-y-[-50%] p-4 border flex-col items-center bg-slate-800 rounded-xl w-[26em] `}
      
    >
        
        {currency === 'token' ? (
            <p className='text-sky-200 mr-8 ml-8 m-2 text-center'>This will burn your @DeSoHosting tokens and start your month of service.</p>
        ) : (
            <p className='text-sky-200 mr-8 ml-8 m-2 text-center'>This will send DeSo from your wallet to @DeSoHosting and start your month of service.</p>
        )}
        <p className='text-sky-200 mt-2 mb-2'>Make your selection below:</p>
      <div className="popup-content bg-slate-500 p-4 w-5/6 rounded-2xl mb-4 mt-4">{children}</div>
    </div>
  );
}

export default Popup;
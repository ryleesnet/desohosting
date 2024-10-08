import { useGeneralStore } from '@/app/stores/general';
import React, { useState, useEffect } from 'react';


interface PopupProps {
  children: React.ReactNode;
}

function Popup({ children }: PopupProps) {
    const {isVisible, setIsVisible, currency} = useGeneralStore()

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
      className={`popup ${isVisible ? 'show' : ''} bg-slate-900/80 fixed flex flex-col justify-center rounded-2xl items-center w-1/4 h-3/5 mt-10`}
      
    >
        
        {currency === 'token' ? (
            <p className='text-sky-200 mr-8 ml-8 m-2 text-center'>This will burn your @DeSoHosting tokens and start your month of service.</p>
        ) : (
            <p className='text-sky-200 mr-8 ml-8 m-2 text-center'>This will send DeSo from your wallet to @DeSoHosting and start your month of service.</p>
        )}
        <p className='text-sky-200 mt-2 mb-2'>Make your selection below:</p>
      <div className="popup-content bg-slate-500 p-4 w-3/4 rounded-2xl">{children}</div>
    </div>
  );
}

export default Popup;
import { useGeneralStore } from '@/app/stores/general';
import React, { useState, useEffect } from 'react';


interface PopupProps {
  children: React.ReactNode;
}

function PopupThanks({ children }: PopupProps) {
    const {isConfirmedVisible, setIsConfirmedVisible} = useGeneralStore()

  // Handle closing the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!document.getElementById('popup-container')?.contains(event.target as Node)) {
        setIsConfirmedVisible(false);
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
      className={`popup ${isConfirmedVisible ? 'show' : ''} bg-slate-900/80 fixed p-4 border flex-col items-center bg-slate-800 rounded-xl w-[26em] `} 
    >
      <div className="popup-content bg-slate-500 p-4 rounded-2xl">{children}</div>
    </div>
  );
}

export default PopupThanks;
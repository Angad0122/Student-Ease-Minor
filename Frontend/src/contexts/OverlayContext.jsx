import React, { createContext, useState, useContext } from 'react';

export const OverlayContext = createContext({
  showLoginOverlay: false,
  setShowLoginOverlay: () => { },

  showSignupOverlay: false,
  setShowSignupOverlay: () => { },

  toggleLoginOverlay:()=>{},
  toggleSignupOverlay:()=>{},
  closeLoginOverlay:()=>{},
  closeSignupOverlay:()=>{},
  
});

export const OverlayProvider = ({ children }) => {
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [showSignupOverlay, setShowSignupOverlay] = useState(false);
  function toggleLoginOverlay() {
    setShowLoginOverlay(!showLoginOverlay)
  }
  function toggleSignupOverlay() {
    setShowSignupOverlay(!showSignupOverlay);
  }
  function closeLoginOverlay() {
    setShowLoginOverlay(false);
  }
  function closeSignupOverlay() {
    setShowSignupOverlay(false);
  }

  return (
    <OverlayContext.Provider
      value={{ showLoginOverlay, setShowLoginOverlay, showSignupOverlay, setShowSignupOverlay,toggleLoginOverlay,toggleSignupOverlay,closeLoginOverlay,closeSignupOverlay }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

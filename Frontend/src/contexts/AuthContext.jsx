import React, { createContext, useState,useContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn:false

});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
export  function useAuth() {
  return useContext(AuthContext)
}
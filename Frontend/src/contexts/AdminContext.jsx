import React, { createContext, useState,useContext } from 'react';

export const AdminContext = createContext({
    userControlPage: true,
    uniformsControlPage: false,
    booksControlPage: false,
    ordersControlPage: false

});

export const AdminProvider = ({ children }) => {
  const [userControlPage, setUserControlPage] = useState(true);
  const [uniformsControlPage, setUniformsControlPage] = useState(false);
  const [booksControlPage, setBooksControlPage] = useState(false);
  const [ordersControlPage, setOrdersControlPage] = useState(false);

  return (
    <AdminContext.Provider value={{ userControlPage, setUserControlPage, uniformsControlPage, setUniformsControlPage, booksControlPage, setBooksControlPage,ordersControlPage, setOrdersControlPage }}>
      {children}
    </AdminContext.Provider>
  );
};
export  function useAdmin() {
  return useContext(AdminContext)
}
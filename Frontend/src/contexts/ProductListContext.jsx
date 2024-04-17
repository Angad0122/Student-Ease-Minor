import React, { createContext, useState,useContext } from 'react';

export const ProductListContext = createContext({
  showBooks:false,
  showUniforms:false

});

export const ProductListProvider = ({ children }) => {
    const [showBooks, setShowBooks] = useState(false);
    const [showUniforms, setShowUniforms] = useState(false);

  return (
    <ProductListContext.Provider value={{ showBooks, setShowBooks, showUniforms, setShowUniforms }}>
      {children}
    </ProductListContext.Provider>
  );
};
export  function useProductList() {
  return useContext(ProductListContext)
}
import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import { useProductList } from '../../contexts/ProductListContext'
import ViewBooks from '../../components/ViewBooks/ViewBooks'
import ViewUniforms from '../../components/ViewUniforms/ViewUniforms'


function ViewProducts() {

    const { showBooks, setShowBooks, showUniforms, setShowUniforms } = useProductList()

    return (
        <>
        <Header/>
        {showBooks ? (
            <ViewBooks/>
        ):(<></>)}

        {showUniforms ?(
            <ViewUniforms/>
        ):(<></>)}
        
        <Footer/>
        </>
    )
}

export default ViewProducts

import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import { useProductList } from "../../contexts/ProductListContext";
import { useAuth } from "../../contexts/AuthContext";



export default function Home() {
  const navigate = useNavigate();

  const { showBooks, setShowBooks, showUniforms, setShowUniforms } = useProductList()
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const viewuniforms = () => {
    setShowUniforms(true)
    setShowBooks(false)
    navigate("/viewproducts")
  }
  
  const viewbooks = ()=> {
    setShowBooks(true);
    setShowUniforms(false)
    navigate('/viewproducts')
  }

  function navigatetosellbook() {
    navigate("/sellbook")
  }





  return (
    <>
      <Header />

      <div className="carousel-container position-relative">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/slider1.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="/slider2.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="/slider3.jpg" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="carousel-text-overlay">
          <div className="text-content">
            <h2>Welcome to Student Ease!</h2>
            <br />
            <p> Your Destination for Books and Uniforms!</p>
          </div>
        </div>
      </div>



      <div className="p-20">


        <div className="container">
          <div id="thebookscontent" className="left-pane">
            <div className="homeleftcontent">
              <br />
              <h2 className="text-black">Elevate Your Professionalism:</h2>
              <br />
              <p className="text-2xl">
                Dress for success with our premium-quality uniforms. We understand the importance of professionalism in every aspect of life, which is why we offer a diverse range of uniforms for students, professionals, and organizations. From school uniforms that foster a sense of community to professional attire that commands respect, our collection combines style, comfort, and durability to help you look and feel your best.</p>
            </div>
          </div>
          <div id="booksimage" className="right-pane">
            <img src="/uniforms.jpg" alt="" />
            <button onClick={viewuniforms} id="booksbutton" className="viewbuttons">View All Uniforms</button>
          </div>
        </div>

        <div className="container">
          <div id="thebookscontent" className="left-pane">
            <div className="homeleftcontent">
              <br />
              <h2 className="text-black">Discover a World of Knowledge:</h2>
              <br />
              <p className="text-2xl">Embark on a literary adventure with our vast collection of books. Whether you're searching for captivating fiction, insightful non-fiction, or educational resources, we have something for every reader. From bestsellers to hidden gems, our curated selection ensures that you'll find the perfect book to ignite your imagination and expand your horizons.</p>
            </div>
          </div>
          <div id="booksimage" className="right-pane">
            <img src="/book.jpg" alt="" />
            <button onClick={viewbooks} id="booksbutton" className="viewbuttons">View All Books</button>
          </div>
        </div>

        <div className="container">
          <div id="thebookscontent" className="left-pane">
            <div className="homeleftcontent">
              <br />
              <h2 className="text-black">Sell your books on our platform:</h2>
              <br />
              <p className="text-2xl">If you have some books that you do not need later and are occupying space. Why don't you sell it so that other person that needs those books can bye them. Sell those books on our platform and have one on one interaction with buyer as a seller. Even You can bargain on the selling price </p>
            </div>
          </div>
          <div id="booksimage" className="right-pane">
            <img src="/sellbooks.jpg" alt="" />
            <button onClick={navigatetosellbook} id="booksbutton" className="viewbuttons">Sell Book</button>
          </div>
        </div>


      </div>

      <Footer />
    </>
  )
}

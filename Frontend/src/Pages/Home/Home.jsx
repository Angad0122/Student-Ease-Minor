import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

import "./Home.css";



export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = localStorage.getItem('token');
    if (!authenticate) {
      navigate("/login");
    }
  }, []);


  //how to set all elements of a div in center?

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
      
      <div className="container">
        <div id="thebookscontent" className="left-pane">
          <div>
            <br />
            <h2>Discover a World of Knowledge:</h2>
            <br />
            <p className="text-2xl">Embark on a literary adventure with our vast collection of books. Whether you're searching for captivating fiction, insightful non-fiction, or educational resources, we have something for every reader. From bestsellers to hidden gems, our curated selection ensures that you'll find the perfect book to ignite your imagination and expand your horizons.</p>
          </div>
        </div>
        <div id="booksimage" className="right-pane">
          <img src="/public/book.jpg" alt="" />
          <button id="booksbutton" className="viewbuttons">View All Books</button>
        </div>
      </div>


      <Footer />
    </>
  )
}

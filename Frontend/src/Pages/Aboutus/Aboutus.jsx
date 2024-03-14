import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import '/src/Pages/Aboutus/Aboutus.css'

export default function Aboutus() {
    return (


        //how to set background image for text?
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
            <div className="">
                <p className="p-20  text-xl text-black py-100%">
                    <h1 className="text-center">About us</h1>
                    <br />
                    Welcome to Studentease! We are thrilled to have you here.
                    <br /><br />
                    At Studentease, we believe that shopping should be convenient, enjoyable, and stress-free. Our mission is to provide you with a seamless online shopping experience, offering a wide range of high-quality products at competitive prices.
                    <br /><br />
                    Founded in 2023, Studentease has quickly grown to become a trusted destination for shoppers worldwide. Whether you're looking for the latest fashion trends, home essentials, electronics, or gifts for your loved ones, we've got you covered.
                    <br /><br />
                    What sets us apart is our commitment to customer satisfaction. We strive to exceed your expectations by offering exceptional customer service, fast shipping, and hassle-free returns. Your satisfaction is our top priority, and we're dedicated to making sure you have a positive shopping experience every time you visit our site.
                    <br /><br />

                    We also understand the importance of staying connected with our community. That's why we actively engage with our customers through social media, newsletters, and blog posts, keeping you informed about the latest product arrivals, promotions, and trends.
                    <br /><br />
                    Thank you for choosing Studentease for all your shopping needs. We look forward to serving you and becoming your preferred online shopping destination.
                    <br /><br />
                    Happy shopping!

                    Studentease</p>
            </div>
            <Footer />
        </>
    )
}
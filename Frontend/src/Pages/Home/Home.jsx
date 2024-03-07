import React, { useEffect } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();


  useEffect(() => {

    const authenticate = localStorage.getItem('token');
    if (!authenticate) {
      navigate("/login");
    }

  }, [])
  return (
    <>
      <Header />
      <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/slider1.jpg" class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="/slider2.jpg" class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="/slider3.jpg" class="d-block w-100" alt="..." />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div className=" left-pane">
        <div className="left">
          <h1 className="m-10 text-4xl "><b>Hello Students</b></h1>
          <p className="m-10 text-2xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat numquam repellat optio perferendis dicta ipsa exercitationem obcaecati quibusdam excepturi commodi explicabo ducimus, odit recusandae natus ex eveniet voluptas magnam, reiciendis dolor deleniti. Ea incidunt, iure nobis sit adipisci blanditiis! Delectus.</p>
        </div>
      </div>
      <div className=" right-pane ">
        <div className="right flex-end">
          <h1 className="m-10 text-4xl "><b>Hello Students</b></h1>
          <p className="m-10 text-2xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat numquam repellat optio perferendis dicta ipsa exercitationem obcaecati quibusdam excepturi commodi explicabo ducimus, odit recusandae natus ex eveniet voluptas magnam, reiciendis dolor deleniti. Ea incidunt, iure nobis sit adipisci blanditiis! Delectus.</p>
        </div>
      </div>
      <Footer />
    </>
  )
}
//how to place a div in the right half of the window css?
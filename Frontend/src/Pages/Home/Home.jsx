import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

import "./Home.css";



export default function Home() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  useEffect(() => {
    const authenticate = localStorage.getItem('token');
    if (!authenticate) {
      navigate("/login");
    }
  }, []);

  function navigateto() {
    navigate("/onsearch")
  }

 

  



  async function submit(e) {
    e.preventDefault();
    localStorage.setItem('token', true);
    // navigate("/");

    try {
      const response = await axios.post("http://localhost:8000/auth/login", { email, password });
      console.log(response);
      setIsLoggedIn(true); // Set isLoggedIn state to true upon successful login
    }
    catch {
      console.log(e);
      alert("Email is not signed up or password is wrong")
    }
  }











  return (
    <>
      <Header email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        submit={submit} />


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
            <img src="/public/uniforms.jpg" alt="" />
            <button onClick={navigateto} id="booksbutton" className="viewbuttons">View All Uniforms</button>
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
            <img src="/public/book.jpg" alt="" />
            <button onClick={navigateto} id="booksbutton" className="viewbuttons">View All Books</button>
          </div>
        </div>


      </div>

      {/* Overlay component */}
      {isOverlayVisible && (
        <div className="overlay">
          <div id="smalldiv" className="p-10 bg-white" >
            <form action="POST">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input onChange={(e) => { setEmail(e.target.value) }} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='example123@gmail.com' />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input onChange={(e) => { setPassword(e.target.value) }} type="password" class="form-control" id="exampleInputPassword1" />
              </div>
            </form>
            <button onClick={submit} id="submitoflogin" type="submit" className="text-white">Submit</button>
            <br />
            <p>OR</p>
            <button id="signup" onClick={navigateto} className="text-white">Signup</button>
          </div>
        </div>
      )}


      <Footer />
    </>
  )
}

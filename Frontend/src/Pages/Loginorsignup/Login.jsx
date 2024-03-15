import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";

import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/Pages/Loginorsignup/Login.css'



export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

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
    if (isLoggedIn) {
        return <Home />;
    }



    function navigateto(){
        navigate("/signup")
    }


    return (
        <>
            <div id="formbg">
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
                        {/* <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div> */}
                    </form>
                    <button onClick={submit} id="submitoflogin" type="submit" className="text-white">Submit</button>
                    <br />
                    <p>OR</p>
                    <button id="signup" onClick={navigateto} className="text-white">Signup</button>
                </div>
            </div>
        </>
    )
}
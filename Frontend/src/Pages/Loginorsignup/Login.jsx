import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";

import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/Pages/Loginorsignup/Login.css'

export default function Login({ closeLoginWindow, toggleLoginWindow, toggleSignupWindow }) {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function submit(e) {
        e.preventDefault();
        localStorage.setItem('token', true);
        
        try {
            const response = await axios.post("http://localhost:8000/auth/login", { email, password });
            console.log(response);
            setIsLoggedIn(true);
            closeLoginWindow();
        } catch {
            console.log(e);
            alert("Email is not signed up or password is wrong");
        }
    }

    function navigatetoSignup() {
        toggleSignupWindow(); // Toggle the Signup window when Signup is clicked
        closeLoginWindow()
    }

    if (isLoggedIn) {
        toggleLoginWindow();
    }

    return (
        <>
            <div>
                <div id="smalldiv" className="p-10 bg-white" >
                    <div id="divofcrossinsidelogindiv" className="">
                        <button onClick={toggleLoginWindow} className="close-button">x</button>
                    </div>

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
                    <button id="signup" onClick={navigatetoSignup} className="text-white">Signup</button>
                </div>
            </div>
        </>
    )
}

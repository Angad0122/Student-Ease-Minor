import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/Pages/Loginorsignup/Login.css'

import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";
import { OverlayContext } from '../../contexts/OverlayContext';


export default function Login() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const { userId, setUserId, user, setUser, email, setEmail, phoneNumber, setPhoneNumber } = useUser()
    const { toggleLoginOverlay, toggleSignupOverlay, closeLoginOverlay } = useContext(OverlayContext);




    async function submit(e) {
        e.preventDefault();
        localStorage.setItem('token', true);

        try {
            const response = await axios.post("http://localhost:8000/auth/login", { email, password });
            console.log(response);
            setIsLoggedIn(true);
            setUser(response.data.username);
            setEmail(response.data.email)
            setPhoneNumber(response.data.phoneNumber)
            setUserId(response.data.userId);
            closeLoginOverlay();
        } catch {
            console.log(e);
            alert("Email is not signed up or password is wrong");
        }

    }

    function navigatetoSignup() {
        toggleSignupOverlay();
        closeLoginOverlay()
    }

    return (
        <>
            <div>
                <div id="smalldiv" className="p-10 bg-white" >
                    <div id="divofcrossinsidelogindiv" className="">
                        <button onClick={toggleLoginOverlay} className="close-button">x</button>
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
                    <button onClick={submit} id="submitoflogin" type="submit" className="text-white">Login</button>
                    <br />
                    <p>OR</p>
                    <button id="signup" onClick={navigatetoSignup} className="text-white">Signup</button>
                </div>
            </div>
        </>
    )
}

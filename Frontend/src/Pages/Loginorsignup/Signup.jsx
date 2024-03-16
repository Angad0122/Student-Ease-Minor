import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/src/Pages/Loginorsignup/Signup.css';

export default function Signup({ closeSignupWindow,toggleSignupWindow, toggleLoginWindow }) {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    async function submit(e) {
        e.preventDefault();

        // Basic form validation
        if (!username || !email || !phonenumber || !password) {
            setError('All fields are required');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            return;
        }

        // Phone number validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phonenumber)) {
            setError('Invalid phone number');
            return;
        }

        // Password validation (you can add more complex rules)
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/signup", { username, email, phonenumber, password });
            console.log(response);
            setError('');
            alert("Signup success now you can login");
            closeSignupWindow()
        } catch (e) {
            console.log(e);
            console.log(error);
            setError('Failed to sign up');
            alert("Failed to signup, username or email already exists");
        }
    }

    function navigatetoLogin() {
        closeSignupWindow()
        toggleLoginWindow()
    }

    return (
        <>
            <div>
                <div id='smalldivforsignup' className='p-10 bg-white'>
                    <div id="divofcrossinsidesignupdiv" className="">
                        <button onClick={toggleSignupWindow} className="close-button">x</button>
                    </div>
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Username</label>
                            <input onChange={(e) => { setUserName(e.target.value) }} type="username" class="form-control" placeholder='User1010' />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input onChange={(e) => { setEmail(e.target.value) }} type="email" class="form-control" aria-describedby="emailHelp" placeholder='example123@gmail.com' />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Phone Number</label>
                            <input onChange={(e) => { setPhoneNumber(e.target.value) }} type="phonenumber" class="form-control" placeholder='10 digit phone number' />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input onChange={(e) => { setPassword(e.target.value) }} type="password" class="form-control" placeholder='Minimum length should be 8' />
                        </div>
                    </form>
                    <button onClick={submit} id="signupsubmit" type="submit" className="text-white">Submit</button>
                    <br />
                    <p>OR</p>
                    <button id="signup" onClick={navigatetoLogin} className="text-white">Login</button>
                </div>
            </div>
        </>
    );
}

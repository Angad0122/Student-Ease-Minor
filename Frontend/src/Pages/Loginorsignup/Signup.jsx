import React from 'react'
import { NavLink  } from "react-router-dom";
import axios from 'axios';

import '/src/Pages/Loginorsignup/Signup.css'


export default function Signup() {
  const [username, setUserName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phonenumber, setPhoneNumber] = React.useState('')
  const [password, setPassword] = React.useState('');
  const [error,setError]=React.useState(false)

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
      alert("Signup success now you can login")
    }
    catch (e) {
      console.log(e)
      console.log(error);
      setError('Failed to sign up');
      alert("failed to signup username or email already exist")

    }
  }




  

  return (
    <>
      <div className="container p-5px backgroundimageis ">
        <div className=''>
          <form>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Username</label>
              <input onChange={(e) => { setUserName(e.target.value) }} type="username" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input onChange={(e) => { setEmail(e.target.value) }} type="email" class="form-control" aria-describedby="emailHelp" />
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Phone Number</label>
              <input onChange={(e) => { setPhoneNumber(e.target.value) }} type="phonenumber" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input onChange={(e) => { setPassword(e.target.value) }} type="password" class="form-control" />
            </div>
          </form>
          <br />
          <button onClick={submit} type="submit" class="btn text-black border-blue btn-primary">Submit</button>
          <br />
          <br />
          <p>OR</p>
          <NavLink to={"/login"}>Login</NavLink>
        </div>
      </div>
    </>
  )
}



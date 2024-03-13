import React from 'react'
import { NavLink } from "react-router-dom";
import '/src/Pages/Loginorsignup/Signup.css'
import axios from 'axios';


export default function Signup() {
  const [username, setUserName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phonenumber, setPhoneNumber] = React.useState('')
  const [password, setPassword] = React.useState('');

  async function submit(e) {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8000/signup", { username, email, phonenumber, password });
      console.log(response);
     
    }
    catch {
      console.log(e);

    }
  }

  // async function submit(e) {
  //   e.preventDefault()
  //   try {
  //     const response = await axios.post("http://localhost:8000/auth/signup", {email, password})
  //      console.log(response);
  //         // res => {
  //         // if (res.data == "exist") {
  //         //   alert("User already signed in ")
  //         // }
  //         // else if (res.data == "notexist") {
  //         //   history("/home")
  //         // }

  //   }
  //   catch {
  //     console.log(e);

  //   }
  // }


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



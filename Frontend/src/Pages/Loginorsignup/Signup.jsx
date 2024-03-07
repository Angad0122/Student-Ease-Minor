import React from 'react'
import { NavLink } from "react-router-dom";
import '/src/Pages/Loginorsignup/Signup.css'


export default function Signup() {
  const [userName, setUserName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [password, setPassword] = React.useState('');

  async function submit(e) {
    e.preventDefault()
    try {
      await axios.post("https://localhost:5173/signup", ( email, password))
        .then(res => console.log(res)
          // res => {
          // if (res.data == "exist") {
          //   alert("User already signed in ")
          // }
          // else if (res.data == "notexist") {
          //   history("/home")
          // }
        )
        .catch(e => {
          // alert("wrong details")
          console.log("error")
        })
    }
    catch {
      console.log(e);

    }
  }


  return (
    <>
      <div  className="container p-5px backgroundimageis ">
        <div className=''>
          <form action="POST">
            {/* <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Username</label>
              <input onChange={(e) => { setUserName(e.target.value) }} type="username" class="form-control" id="exampleInputPassword1" />
            </div> */}
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input onChange={(e) => { setEmail(e.target.value) }} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            {/* <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Phone Number</label>
              <input onChange={(e) => { setPhoneNumber(e.target.value) }} type="phonenumber" class="form-control" id="exampleInputPassword1" />
            </div> */}
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input onChange={(e) => { setPassword(e.target.value) }} type="password" class="form-control" id="exampleInputPassword1" />
            </div>
            {/* <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div> */}
            <button onClick={submit} type="submit" class="btn text-black border-blue btn-primary">Submit</button>
            <br />
            <p>OR</p>
            <br />
            <NavLink to={"/login"}>Login</NavLink>
          </form>
        </div>
      </div>
    </>
  )
}



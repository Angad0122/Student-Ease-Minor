import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = React.useState('')
    const [password , setPassword] = React.useState('')
    async function submit(e){
        e.preventDefault();
        console.log("hyy");
        localStorage.setItem('token',true);
        //navigate("/");
        
        try{
            const response = await axios.post("http://localhost:8000/auth/login",{email,password});
            console.log(response);
        }
        catch{
            console.log(e);

        }
    }





    return (
        <>
            <div className="container p-5px">
                <div  >
                    <form action="POST">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" class="form-control" id="exampleInputPassword1" />
                        </div>
                        {/* <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div> */}
                        <button onClick={submit} type="submit" class="btn text-black border-blue btn-primary">Submit</button>
                        <br />
                        <p>OR</p>
                        <br />
                        <Link to={"/signup"} className="">Signup</Link>
                    </form>
                </div>
            </div>
        </>
    )
}
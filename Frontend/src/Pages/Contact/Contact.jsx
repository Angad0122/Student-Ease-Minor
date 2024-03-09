import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
export default function () {
    const [user, setUser] = useState("");
    const [Feedback, setFeedback] = useState("");
    return (
        <>
            <Header />
            <h1 className="text-4xl text-center"><b>Contact Us</b></h1>
            <div className="m-10">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">User Name</label>
                <input onchange={(e)=>{setUser(e.target.value)}} type="username" class="form-control" id="exampleFormControlInput1" placeholder="User1010" />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Feedback</label>
                <textarea onchange={(e)=>{setFeedback(e.target.value)}} class="form-control" id="exampleFormControlTextarea1" placeholder="Your Feedback" rows="3"></textarea>
            </div>
            <button type="submit" class="btn text-black btn-primary">Submit</button>
            </div>
            <Footer />
        </>
    )
}
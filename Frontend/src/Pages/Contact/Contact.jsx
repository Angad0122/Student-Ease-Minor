import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function ContactUs() {
    const [user, setUser] = useState("");
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        // Here you can add code to handle form submission
        // For simplicity, I'm just setting submitted to true
        setSubmitted(true);
    };

    return (
        <>
            <Header />
            {submitted ? (
                <div id="divonsubmit" className="m-10 text-center">
                    <h2>Thank you! We appreciate your feedback!</h2>
                </div>
            ) : (
                <div id="div1" className="m-10">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">User Name</label>
                        <input onChange={(e)=>{setUser(e.target.value)}} type="username" className="form-control" id="exampleFormControlInput1" placeholder="User1010" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Feedback</label>
                        <textarea onChange={(e)=>{setFeedback(e.target.value)}} className="form-control" id="exampleFormControlTextarea1" placeholder="Your Feedback" rows="3"></textarea>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn text-black btn-primary">Submit</button>
                </div>
            )}
            <Footer />
        </>
    );
}

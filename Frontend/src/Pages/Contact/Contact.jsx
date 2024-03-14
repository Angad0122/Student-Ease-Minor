import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function ContactUs() {
    const [user, setUser] = useState("");
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [feedbacklength,setFeedbacklength] = useState("")
    const [usernamelength,setusernamelength] = useState("")

    const handleSubmit = () => {
        
        if (feedbacklength==0 || usernamelength==0){
            alert("please provide valid feedback")
        }
        else{
            setSubmitted(true);
        }
    };

    return (
        <>
            <Header />
            <div className="">
            {submitted ? (
                <div id="divonsubmit" className="m-10 text-center">
                    <h2>Thank you! We appreciate your feedback!</h2>
                </div>
            ) : (
                <div id="div1" className="m-10">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">User Name</label>
                        <input onChange={(e)=>{setUser(e.target.value),setusernamelength(e.target.value.length)}} type="username" className="form-control" id="exampleFormControlInput1" placeholder="User1010" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Feedback</label>
                        <textarea onChange={(e)=>{setFeedback(e.target.value),setFeedbacklength(e.target.value.length)}} className="form-control" id="exampleFormControlTextarea1" placeholder="Your Feedback" rows="3"></textarea>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn text-black btn-primary">Submit</button>
                </div>
            )}
            </div>
            <Footer />
        </>
    );
}

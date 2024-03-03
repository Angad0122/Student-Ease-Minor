import React from 'react'

export default function Signup() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('');
  async function submit(e) {
    e.preventDefault()
    try {
      await axios.post("https://localhost:5173/signup", (email, password))
        .then(res => {
          if (res.data == "exist") {
            alert("User already signed in ")
          }
          else if (res.data == "notexist") {
            history("/home")
          }
        })
        .catch(e => {
          alert("wrong details")
          console.log("error")
        })
    }
    catch {
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
              <input onChange={(e) => { setEmail(e.target.value) }} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
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
            <Link to={"/login"} className="">Login</Link>
          </form>
        </div>
      </div>
    </>
  )
}



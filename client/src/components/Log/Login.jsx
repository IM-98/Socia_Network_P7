import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

 

  
  const LogIn = (e) => {

    e.preventDefault()
    const emailErrors = document.querySelector('.email-error')
    const passwordErrors = document.querySelector('.password-error')
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password
      }
    })
      .then( async (res) => {
        if (res.data.errors) {
          emailErrors.innerHTML = res.data.errors.email
          passwordErrors.innerHTML = res.data.errors.password
        }
        else{
          navigate("/feed", { replace: true })
          
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }



  return (
    <form className='login-form' onSubmit={LogIn}>
      <label htmlFor="email"> Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" />
      <div className='email-error'></div>

      <label htmlFor="password"> Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className='password-error'></div>

      <input type="submit" value="Se connecter" className='submitBtn' />

    </form>
  )
}

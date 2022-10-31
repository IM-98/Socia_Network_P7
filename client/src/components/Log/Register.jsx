import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Login from './Login'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../actions/users.actions'

export default function Register({login, register}) {

  const [formSubmit, setFormSubmit] = useState(false)
  const [email, setEmail] = useState("")
  const [pseudo, setPseudo] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const dispatch = useDispatch()

  const Register = (e) => {

    e.preventDefault()
    const emailErrors = document.querySelector('.email-error')
    const pseudoErrors = document.querySelector('.pseudo-error')
    const passwordErrors = document.querySelector('.password-error')
    const passwordConfirmErrors = document.querySelector('.password-confirm-error')

    passwordConfirmErrors.innerHTML = ""
   
   if(password !== passwordConfirm){
    passwordConfirmErrors.innerHTML = "les mots de passes ne correspondent pas"
   } else{
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/signup`,
      withCredentials: true,
      data: {
        pseudo,
        email,
        password
      }
    })
    .then((res) => {
      if (res.data.errors) {
        //corriger la gestion des erreurs avec validator js 13.7
        pseudoErrors.innerHTML = res.data.errors.pseudo
        emailErrors.innerHTML = res.data.errors.email
        passwordErrors.innerHTML = res.data.errors.password
      }
      else {
        dispatch(getUsers())
        setFormSubmit(true)
        login(true)
        register(false)
      }
    })
    .catch((err) => {
      console.log(err)
    })
   }
  }


  return (
<>
    {formSubmit ? (<><Login/> <h4> Enregistrement réussis, veuillez vous connecter</h4></>) : (
      <form className='register-form' onSubmit={Register}>
        <label htmlFor="pseudo"> Pseudo</label>
        <input type="text" name='pseudo' value ={pseudo} onChange={(e) => setPseudo(e.target.value)}/>
        <div className='pseudo-error'></div>
  
        <label htmlFor="email"> Email</label>
        <input type="email" value ={email} onChange={(e) => setEmail(e.target.value)} />
        <div className='email-error'></div>
  
        <label htmlFor="password"> Mot de passe</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <div className='password-error'></div>
  
        <label htmlFor="password"> Confirmez votre mot de passe</label>
        <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
        <div className='password-confirm-error'></div>
  
        <input type="submit" value="S'inscrire" className='submitBtn' />
  
      </form>
      ) }
</>
  )
}

import React from 'react'
import Register from './Register'
import Login from './Login'
import { useState } from 'react'


export default function Log() {

    const [registerModal, setRegisterModal] = useState(true)
    const [loginModal, setLoginModal] = useState(false)

    const logChoice = (e) => {
        if(e.target.id === "register"){
            setLoginModal(false)
            setRegisterModal(true)
        }
        if(e.target.id ==="login"){
            setRegisterModal(false)
            setLoginModal(true)
        }
        
    }


    return (

        <>
            <button className={ registerModal ? " btnLog active" : "btnLog"} onClick={logChoice} id="register">S'inscrire</button>
            <button className={ loginModal ? "btnLog active" : "btnLog"} onClick={logChoice} id="login">Se connecter</button>
            <div className='form-container'>
            
            {registerModal && <Register login = {setLoginModal} register = {setRegisterModal}/>}
            {loginModal && <Login/>}
                
            </div>
        </>
    )
}

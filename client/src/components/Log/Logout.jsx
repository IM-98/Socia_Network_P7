import React from 'react'
import axios from 'axios'
import cookie from "js-cookie"
import LogOutIcon from "../../styles/assets/logout.svg"
import { useNavigate } from "react-router-dom"


export default function Logout() {
  const navigate = useNavigate()


  const removeCookie = (key) => {
    if (window !== undefined) {
      cookie.remove(key, { expires: 1 })
    }
  }

  const logout = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true
    })
      .then(() => {
        removeCookie("jwt")
        window.location =  "/"
        navigate("/", { replace: true })
      })
      .catch(err => console.log(err))


  }


  return (
    <img src={LogOutIcon} className="log" alt="logout" onClick={logout} />
  )
}

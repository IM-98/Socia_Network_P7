import React, { useContext } from 'react'
import { UidContext } from '../../context/UserContext'
import { Outlet, useLocation } from "react-router-dom"
import Home from '../../pages/Home'


function PrivateRoutes() {
    const uid = useContext(UidContext)
    const location = useLocation()

    // state={{from: location}} replace
    console.log(uid)

    return (
       uid !== null  ? <Outlet /> : <Home  />
    )
}

export default PrivateRoutes

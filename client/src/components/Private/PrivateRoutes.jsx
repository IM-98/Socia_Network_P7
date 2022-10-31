import React, { useContext } from 'react'
import { UidContext } from '../../context/UserContext'
import { Outlet } from "react-router-dom"
import Home from '../../pages/Home'


function PrivateRoutes() {
    const uid = useContext(UidContext)

    return (
       uid !== null  ? <Outlet /> : <Home  />
    )
}

export default PrivateRoutes

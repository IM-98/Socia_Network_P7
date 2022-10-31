import React, { useContext } from 'react'
import { UidContext } from '../../context/UserContext'
import { Outlet, useLocation } from "react-router-dom"
import Feed from '../../pages/Feed'


function PublicRoutes() {
    const uid = useContext(UidContext)
    const location = useLocation()

    console.log(uid)

    return (
       uid === null  ? <Outlet /> : <Feed  />
    )
}

export default PublicRoutes

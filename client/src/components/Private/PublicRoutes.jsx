import React, { useContext } from 'react'
import { UidContext } from '../../context/UserContext'
import { Outlet } from "react-router-dom"
import Feed from '../../pages/Feed'


function PublicRoutes() {
    const uid = useContext(UidContext)

    return (
       uid === null  ? <Outlet /> : <Feed  />
    )
}

export default PublicRoutes

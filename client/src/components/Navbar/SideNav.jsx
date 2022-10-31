import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as UserIcon } from "../../styles/assets/user.svg"
import { ReactComponent as Home } from "../../styles/assets/home.svg"
import { ReactComponent as Feed } from "../../styles/assets/feed.svg"

export default function SideNav() {
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to='/home' className={({ isActive }) =>
                        isActive ? "active-left-nav" : ""}>
                        <Home />
                    </NavLink>
                    <br />
                    <NavLink to='/feed' className={({ isActive }) =>
                        isActive ? "active-left-nav" : ""}>
                        <Feed />
                    </NavLink>
                    <br />
                    <NavLink to='/profil' className={({ isActive }) =>
                        isActive ? "active-left-nav" : ""}>
                        <UserIcon />
                    </NavLink>
                </div>
            </div>
        </div>
    )

}

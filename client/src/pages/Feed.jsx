import React from 'react'
import Post from '../components/Feed/Post'
// import SideNav from '../components/Navbar/SideNav'
import Thread from "../components/Feed/Thread"
import Cookies from "js-cookie"

// console.log(Cookies.getItem("jwt"))

export default function Feed() {
  return (
    <div>
        {/* <SideNav/> */}
        <div className="main">
            <div className="home-header">
              <Post/>
            </div>
            <Thread/>
        </div>
    </div>
  )
}

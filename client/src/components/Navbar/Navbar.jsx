import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../styles/assets/logo-g.png"
import  UserIcon  from "../../styles/assets/user.svg"
import Logout from '../Log/Logout'
import { UidContext } from '../../context/UserContext'


export default function Navbar() {

    const uid = useContext(UidContext)
    

    return (
        <nav>
            <div className="nav-container">
                {uid ?

                    (<Link to="/feed">
                        <div className="logo">
                            <img src={Logo} alt="logo groupomania" />
                            <h3>Groupomania</h3>
                        </div>
                    </Link>) : (<Link to="/">
                        <div className="logo">
                            <img src={Logo} alt="logo groupomania" />
                            <h3>Groupomania</h3>
                        </div>
                    </Link>)
                }

                {uid ? (
                    <div className='usernav'>
                        <Link to={`/profil/${uid}`}>
                            <div className='usericon'>
                                <img src={UserIcon} className="user" alt='user profile link' />
                            </div>
                        </Link>
                        <Link>
                            <div className='logout'>
                                <Logout />
                            </div>
                        </Link>
                    </div>) : <p> connectez vous</p>}

            </div>
        </nav>
    )
}

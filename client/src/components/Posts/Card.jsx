import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../Utils'

import ReactTimeAgo from "react-time-ago"
import FollowHandler from "../Profile/FollowHandler"
import LikeButton from './LikeButton'
import CommentIcon from '../../styles/assets/message1.svg'  // a transformer en img
import Share from '../../styles/assets/share.svg'
import Edit from '../../styles/assets/edit.svg'
import { updatePost } from '../../actions/posts.actions'
import Delete from './Delete'
import Comment from './Comment'



export default function Card({ post }) {
    
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdated, setIsUpdated] = useState(false)
    const [textUpdated, setTextUpdated] = useState(null)
    const [showComment, setShowComment] = useState(false)
    const usersData = useSelector(state => state.usersReducer)
    const userData = useSelector(state => state.userReducer)

    const dispatch = useDispatch()

    

    const updateItem = () => {

        if (textUpdated) {
            dispatch(updatePost(post._id, textUpdated, userData._id, userData.isAdmin))
        }
        setIsUpdated(false)

    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false)


    }, [usersData, dispatch, userData, post])
    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className='fa-solid fa-spinner fa-spin'></i>
            ) : (
                <>
                    <div className="card-left">
                        <img src={!isEmpty(usersData[0]) && usersData.map(user => {
                            if (user._id === post.posterId)
                                return (`${process.env.REACT_APP_API_PROFILE}${user.picture}`)
                            else return null
                        }).join("")}

                            alt="poster-pic" />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {!isEmpty(usersData[0]) && usersData.map(user => {
                                        if (user._id === post.posterId)
                                            return user.pseudo
                                        else return null
                                    })}
                                </h3>
                                {post.posterId !== userData._id && <FollowHandler className="icon" idToFollow={post.posterId} type={"card"} />}

                            </div>
                            <span><ReactTimeAgo date = {Date.parse(post.createdAt)} locale = "fr"/> </span>
                        </div>
                        {isUpdated === false && <p>{post.message}</p>}
                        {isUpdated && <div className="update-post">
                            <textarea
                                defaultValue={post.message}
                                onChange={e => setTextUpdated(e.target.value)} />
                            <div className="button-container">
                                <button className="btn" onClick={updateItem}>
                                    Valider Modification
                                </button>
                            </div>
                        </div>}
                        {post.picture && (<img src={`${process.env.REACT_APP_API_IMG}/${post.picture}`} alt="card pic" className='card-pic' />)}
                        {post.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={post._id}
                            ></iframe>
                        )}
                        {(userData.isAdmin === true || userData._id === post.posterId) && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src={Edit} alt="modifier" />
                                </div>
                                <Delete id={post._id} />
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img src={CommentIcon} onClick={() => setShowComment(!showComment)} className="comment-i" alt='comment a post icon'/>
                                <span>{post.comments && post.comments.length}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src={Share} className="comment-i" alt='share a post icon' />
                        </div>
                        {showComment && <Comment post={post} />}
                    </div>
                </>
            )
            }
        </li>
    )
}

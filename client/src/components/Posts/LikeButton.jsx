import React from 'react'
import { useState, useEffect, useContext } from 'react'
import {UidContext} from "../../context/UserContext"
import   Like  from '../../styles/assets/heart.svg'
import  Liked  from '../../styles/assets/heart-filled.svg'
import { useDispatch } from 'react-redux'
import { likePost, unlikePost } from '../../actions/posts.actions'

const LikeButton = ({post}) => {

    const [liked, setLiked] = useState(false)
    const uid = useContext(UidContext)
    const dispatch = useDispatch()

    const like = () => {
        dispatch(likePost( post._id, uid))
        setLiked(true)
        
    }
    

    const unlike = () => {
        dispatch(unlikePost(post._id, uid))
        setLiked(false)
    }
    
    useEffect(()=> {
        if (post.likers.includes(uid)){
            setLiked(true)
        }
        else{
            setLiked(false)
        }
    }, [uid, liked, post.likers])

    



  return (
    <div className="like-container">
      {uid && liked === false && (<img src={Like} onClick = {like} className="comment-i" alt='like'/>)}
      {uid && liked  && (<img src={Liked} onClick = { unlike} className="comment-i" alt='liked'/>)}
      <span>{post.likers.length}</span>    
    </div>
  )
}

export default LikeButton
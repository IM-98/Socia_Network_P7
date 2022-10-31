import React from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { getPosts } from '../../actions/posts.actions'
import Card from '../Posts/Card'
import {isEmpty} from "../Utils"

export default  function Thread() {

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.postsReducer)
    
  useEffect(  ()=>{
    dispatch(getPosts())  

  }, [dispatch])


  return (
    <div className="thread-container">
        <ul>
            {!isEmpty(posts[0]) && posts.map(post => {
                return <Card post = {post} key = {post._id} />
            })}
        </ul>
    </div>
  )
}

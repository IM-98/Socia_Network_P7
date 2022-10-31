import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost } from '../../actions/posts.actions'
import  DeleteIcon  from '../../styles/assets/trash.svg'

function Delete(props) {
    const userData = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const deleteQuote = () => dispatch(deletePost(props.id,userData._id, userData.isAdmin ))
  return (
    <div onClick={()=> {
        if(window.confirm("Etes-vous sur de vouloir supprimer ce post ?")){
            deleteQuote()
        }
    }}>
    <img src={DeleteIcon} alt="delete" />
    </div>
  )
}

export default Delete
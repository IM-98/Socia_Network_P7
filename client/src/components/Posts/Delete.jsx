import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions/posts.actions'
import  DeleteIcon  from '../../styles/assets/trash.svg'

function Delete(props) {
    const dispatch = useDispatch()
    const deleteQuote = () => dispatch(deletePost(props.id))
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
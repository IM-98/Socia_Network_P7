import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment, editComment } from '../../actions/posts.actions'
import { UidContext } from '../../context/UserContext'
import Edit from "../../styles/assets/edit.svg"
import Delete from "../../styles/assets/trash.svg"

function EditDeleteComment({comment, postId}) {
  const [isAuthor, setIsAuthor] = useState(false)
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState("")
  const uid = useContext(UidContext)
  const userData = useSelector(state => state.userReducer)
  const dispatch = useDispatch()


  const handleEdit = (e) => {
    e.preventDefault()
    if (text) {
      dispatch(editComment(postId, comment._id, text))
      setText("")
      setEdit(false)
    }
  }

  const handleDelete = () => dispatch(deleteComment(postId, comment._id))

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true)
      }
    }
    checkAuthor()
  }, [uid, comment.commenterId])




  return (
    <div className="edit-comment">
      {((userData.isAdmin || isAuthor) && edit === false) && (
        <span onClick={() => setEdit(!edit)}>
          <img src={Edit} alt="modifier" />
        </span>
      )}
      {((userData.isAdmin || isAuthor) && edit === true) && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}> Annuler</label>
          <br />
          <input type="text" name='text' onChange={e => setText(e.target.value)} defaultValue={comment.text} />
          <br />
          <div className="btn">
            <span onClick={() => {
              if (window.confirm("Voulez vous supprimer le commentaire ?")) {
                handleDelete()
              }
            }}>
              <img src={Delete} alt="supprimer" />
            </span>
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}
    </div>
  )
}

export default EditDeleteComment
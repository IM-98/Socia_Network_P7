import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UidContext } from '../../context/UserContext'
import { isEmpty, timestampParser } from '../Utils'
import ImgIcon from "../../styles/assets/picture.svg"
import { addPost, getPosts } from '../../actions/posts.actions'

function Post() {
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [postPicture, setPostPicture] = useState(null)
    const [video, setVideo] = useState("")
    const [file, setFile] = useState()
    const userData = useSelector(state => state.userReducer)
    const uid = useContext(UidContext)
    const dispatch = useDispatch()

    const handlePost = async () => {
        
        if (message || postPicture || video) {
            const data = new FormData();
            data.append('posterId', userData._id);
            data.append('message', message);
            if (file) {data.append("file", file)};
            data.append('video', video);
            
            await dispatch(addPost(data));
            dispatch(getPosts());
            cancelPost();
          } else {
            alert("Veuillez entrer un message")
          }
    }

    

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
        setVideo("")
    }

    const cancelPost = () => {
        setMessage("")
        setPostPicture(null)
        setVideo("")
        setFile("")
    }

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false)
        

        const handleVideo = () => {
            let findLink = message.split(" ");
            for (let i = 0; i < findLink.length; i++) {
                if (
                    findLink[i].includes("https://www.youtube") ||
                    findLink[i].includes("https://youtube")
                ) {
                    let embed = findLink[i].replace("watch?v=", "embed/")
                    setVideo(embed.split("&")[0])
                    findLink.splice(i, 1);
                    setMessage(findLink.join(" "))
                    setPostPicture("")
                }
            }
        }
        handleVideo()
    }, [ userData, message, video ])


    return (
        <div className="post-container">
            {isLoading ? (
                <i className='fas fa-spinner fa-spinner'></i>
            ) : (
                <>
                    <div className="data">
                        <p><span>{userData.following ? userData.following.length : 0}</span> Abonnement{userData.following && userData.following.length > 1 ? "s" : null}</p>
                        <p><span>{userData.followers ? userData.followers.length : 0}</span> Abonné{userData.followers && userData.followers.length > 1 ? "s" : null}</p>

                    </div>
                    <Link to={`/profil/${uid}`}>
                        <div className="user-info">
                            <img src={`${process.env.REACT_APP_API_PROFILE}${userData.picture}`} alt="user profile " />
                        </div>
                    </Link>
                    <div className="post-form">
                        <textarea name='message' id='message' placeholder="Whats up" onChange={e => setMessage(e.target.value)} value={message} />
                        {message || postPicture || video.length > 10 ? (
                            <li className="card-container">
                                <div className="card-left">
                                    <img src={`${process.env.REACT_APP_API_PROFILE}${userData.picture}`} alt="user " />
                                </div>
                                <div className="card-right">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.pseudo}</h3>
                                            <span className='date-post'>{timestampParser(Date.now())}</span>
                                        </div>
                                    </div>
                                    <div className="content">
                                            <p>{message}</p>
                                            { postPicture && <img src={postPicture} alt="post content" />}
                                            {video && (<iframe
                                                src={video}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={video}
                                            ></iframe>

                                            )}
                                    </div>
                                </div>
                            </li>
                        ) : null}
                        <div className="footer-form">
                            <div className="icon">
                                {isEmpty(video) && (
                                    <>
                                        <img src={ImgIcon} alt="logo " />
                                        <input type="file" id='file-upload' name='file' accept='.jpg, .png, .jpeg' onChange={e => handlePicture(e)} />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo("")}> Supprimer video</button>
                                )}
                                <div className="btn-send">
                                    {message || postPicture || video.length > 20 ? (
                                        <button className="cancel" onClick={cancelPost}> Annuler le post</button>
                                    ) : null}
                                    <button className="send" onClick={handlePost}>Envoyer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Post
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const [imgSrc, setImgSrc] = useState()
  const [imgKey, setImgKey] = useState()

  const handlePicture =  (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData._id));
    
  };

    useEffect(()=>{
      setImgSrc(`${process.env.REACT_APP_API_PROFILE}${userData.picture}`)
      setImgKey(Date.now())
    },[dispatch, userData])

  return (
    <>
      <h3>Photo de profil</h3>
      <img src={`${imgSrc}?${imgKey}`} alt="user-pic" />
      <form action="" onSubmit={handlePicture} className="upload-pic">
        <label htmlFor="file">Changer d'image</label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
    </>
  );
};

export default UploadImg;
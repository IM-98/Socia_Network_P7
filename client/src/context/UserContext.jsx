import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../actions/user.actions";

export const UidContext = createContext()

export function UidContextProvider(props){
    const [uid, setUid] = useState(null)
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect( ()=> {
        const fetchToken =  async ()=>{
            await axios({ 
            method: "get",
            url : `${process.env.REACT_APP_API_URL}jwtid`,
            withCredentials: true
          })
          .then( res=> {
            if(res.data !== ""){
              setUid(res.data)
            }
            
          })
          .catch(err => console.log(err, "no token"))
        } 
        fetchToken()

        
        if(uid) dispatch(getUser(uid))
        
      
      }, [location, uid, dispatch])


    return (
        <UidContext.Provider value={uid}>
            {props.children}
        </UidContext.Provider>

    )
}




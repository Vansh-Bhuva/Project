import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}){

    const navigate = useNavigate()
    const [loader, setloader] = useState(true)
    const authStatus = useSelector(state => state.reducer.isLoggedIn)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false
        
        if(authentication && authStatus !== authentication)
        {
            navigate("/Login")
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setloader(false)
    },[authStatus,navigate,authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SET_LOGIN } from '../redux/features/auth/authSlice'
import { getLoginStatus } from '../services/authService'

// redirect loggedout users to a path
const useRedirectLoggedOutUser = (path) => {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    useEffect(()=>{
        const redirectLoggedOutUser=async()=>{
            const isLoggedIn=await getLoginStatus();

            dispatch(SET_LOGIN(isLoggedIn))

            
            if(!isLoggedIn)
            {
                toast.info('Session expired, Please login to continue!');
                navigate(path);

                return ;
            }
        };
        redirectLoggedOutUser()
    },[dispatch,navigate,path])
}

export default useRedirectLoggedOutUser

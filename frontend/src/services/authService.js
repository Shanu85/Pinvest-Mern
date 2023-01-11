import axios from 'axios';
import {toast} from 'react-toastify';


export const BACKEND_URL=process.env.REACT_APP_BACKEND_URL

export const validateEmail=(email)=>
{
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

export const registerUser=async(userData)=>{
    try
    {
        // withCredentials help us to get cookies from backend to save in frontend
        const response=await axios.post(`${BACKEND_URL}/api/users/register`,userData,{
            withCredentials:true
        })

        if(response.statusText==='OK')
        {
            toast.success('User Registered Successfully!');
        }

        return response.data
    }
    catch(err)
    {
        // error can be in any format

        const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();

        toast.error(message);
        
    }
}

export const loginUser=async(userData)=>{
    try
    {
        
        const response=await axios.post(`${BACKEND_URL}/api/users/login`,userData)

        if(response.statusText==='OK')
        {
            toast.success('User LoggedIn Successfully!');
        }

        return response.data
    }
    catch(err)
    {
        // error can be in any format

        const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();

        toast.error(message);
        
    }
}

export const logoutUser=async()=>{
    try
    {
        
        await axios.get(`${BACKEND_URL}/api/users/logout`);
    }
    catch(err)
    {
        // error can be in any format

        const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();

        toast.error(message);
        
    }
}

export const forgotPassword=async(userData)=>{
    try
    {
        
        const response = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`,userData);
        toast.success(response.data.message)
    }
    catch(err)
    {
        // error can be in any format

        const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();

        toast.error(message);
        
    }
}

export const resetPassword=async(userData,resetToken)=>{
    try
    {
        const response = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`,userData);
        return response.data
    }
    catch(err)
    {
        // error can be in any format

        const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();

        toast.error(message);
        
    }
}

// get login status
export const getLoginStatus=async()=>{

    try
    {
        const response= await axios.get(`${BACKEND_URL}/api/users/loggedin`);

        return response.data
    }
    catch(err)
    {
        // error can be in any format

        const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();

        toast.error(message);
    }
}

// get use Profile
export const getUser=async()=>{

    try
    {
        const response= await axios.get(`${BACKEND_URL}/api/users/getuser`);

        return response.data
    }
    catch(err)
    {
        // error can be in any format

        const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();

        toast.error(message);
    }
}

// update profile
export const updateUser=async(formData)=>{
    try
    {
        const response=await axios.patch(`${BACKEND_URL}/api/users/updateuser`,formData);

        return response.data
    }
    catch(err)
    {
         // error can be in any format

         const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();

        toast.error(message);
    }
}

// change password
export const changePassword=async(formData)=>{
    try
    {
        const response=await axios.patch(`${BACKEND_URL}/api/users/changepassword`,formData);

        return response.data
    }
    catch(err)
    {
         // error can be in any format

         const message=(
            err.response && err.response.data && err.response.data.message
        ) || err.message || err.toString();

        toast.error(message);
    }
}


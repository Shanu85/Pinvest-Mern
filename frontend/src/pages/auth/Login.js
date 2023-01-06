import React from 'react'
import styles from './auth.module.scss'
import {BiLogIn} from "react-icons/bi";
import Card from '../../components/card/Card';
import { Link , useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {toast} from 'react-toastify';
import { loginUser, validateEmail } from '../../services/authService';
import {SET_LOGIN,SET_NAME} from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';


const initialState=
{
  email:'',
  password:''
}

const Login = () => {

  const dispatch=useDispatch();
  const naviatge=useNavigate();

  const [isLoading,setIsLoading]=useState(false);
  const [formaData,setfromData]=useState(initialState);

  const {email,password}=formaData;

  const handleInputChange=(e)=>
  {
    const {name,value}=e.target;

    // get the initial state, then set the [name]'s value to value
    setfromData({...formaData,[name]:value}); 
  }

  const login=async(e)=>
  {
    e.preventDefault();

    if(!email || !password)
    {
      return toast.error("All fields are required!")
    }
    if(!validateEmail(email))
    {
      return toast.error("Please enter a valid email!")
    }

    const userData={email,password};

    setIsLoading(true);

    try
    {
        const data=await loginUser(userData);

        console.log(data)

        await dispatch(SET_LOGIN(true))
        await dispatch(SET_NAME(data.name))
        naviatge('/dashboard');

    } 
    catch(error)
    {
      console.log(error.message);
    }

    setIsLoading(false);
  }

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader/>}
      <Card>
        <div className={styles.form}>
            <div className='--flex-center'>
                <BiLogIn size={35} color='#999'/>
            </div>
            <h2>Login</h2>


            <form onSubmit={login}>
              <input type='email' placeholder='Email' required name="email" value={email} onChange={handleInputChange}/>
              <input type='password' placeholder='Password' required name="password" value={password} onChange={handleInputChange}/>
              <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
            </form>



            <Link to='/forgot'> Forgot Password</Link>

            <span className={styles.register}>
              <Link to='/'> Home </Link>
              <p> &nbsp; Don't have an account &nbsp; </p>
              <Link to='/register'>Register</Link>
            </span>
        </div>
      </Card>
    </div>
  )
}

export default Login

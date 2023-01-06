import React, { useState } from 'react';
import styles from './auth.module.scss'
import {TiUserAddOutline} from "react-icons/ti";
import Card from '../../components/card/Card';
import { Link,useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { registerUser, validateEmail } from '../../services/authService';
import {useDispatch} from 'react-redux';
import {SET_LOGIN,SET_NAME} from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';


const initialState=
{
  name:'',
  email:'',
  password:'',
  password2:''
}

const Register = () => {

  const dispatch=useDispatch();
  const naviatge=useNavigate();

  const [isLoading,setIsLoading]=useState(false);
  const [formaData,setfromData]=useState(initialState);

  const {name,email,password,password2}=formaData;

  const handleInputChange=(e)=>
  {
    const {name,value}=e.target;

    // get the initial state, then set the [name]'s value to value
    setfromData({...formaData,[name]:value}); 
  }

  const register= async (e) =>
  {
    e.preventDefault() // stop form loading

    if(!name || !email || !password || !password2)
    {
      return toast.error("All fields are required!")
    }

    if(password.length<6)
    {
      return toast.error("Password must be up to 6 characters!")
    }

    if(!validateEmail(email))
    {
      return toast.error("Please enter a valid email!")
    }

    if(password!==password2)
    {
      return toast.error("Passwords do not match!")
    }

    const userData={name,email,password};

    setIsLoading(true);
    try
    {
        const data=await registerUser(userData);

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
                <TiUserAddOutline size={35} color='#999'/>
            </div>
            <h2>Register</h2>


            <form onSubmit={register}>
            <input type='text' placeholder='Name' required name="name" value={name} onChange={handleInputChange}/>
              <input type='email' placeholder='Email' required name="email" value={email} onChange={handleInputChange}/>
              <input type='password' placeholder='Password' required name="password" value={password} onChange={handleInputChange}/>
              <input type='password' placeholder='Confirm Password' required name="password2" value={password2} onChange={handleInputChange}/>
              <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
            </form>



            <span className={styles.register}>
              <Link to='/'> Home </Link>
              <p> &nbsp; Already have an account &nbsp; </p>
              <Link to='/login'>Login</Link>
            </span>
        </div>
      </Card>
    </div>
  )
}

export default Register

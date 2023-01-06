import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../services/authService'
import { useNavigate } from 'react-router-dom';
import { selectName, SET_LOGIN} from '../../redux/features/auth/authSlice';


const Header = () => {

  const dispatch=useDispatch();
  const naviatge=useNavigate();
  const name=useSelector(selectName);

  const logout=async()=>{
    await logoutUser();
    dispatch(SET_LOGIN(false));
    naviatge('/login');
  }

  return (
    <div className='--pad header'>
      <div className='--flex-between'>
        <h3>
            <span className='--fw-thin'>Welcome, </span>
            <span className='--color-danger'>{name}</span>
        </h3>

        <button className='--btn --btn-danger' onClick={logout}>Logout</button>
      </div>
      <hr/>
    </div>
  )
}

export default Header

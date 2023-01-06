import React from 'react'
import loderImg from '../../assets/loader.gif'
import  ReactDOM  from 'react-dom';
import './Loader.scss'

// full screen loader
const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
        <div className='loader'>
            <img src={loderImg} alt='Loading ...'/>
        </div>
    </div>,
    document.getElementById('loader')
  )
}


// just spinner image
export const SpinnerImg=()=>{
    return(
        <div className='--center-all'>
            <img src={loderImg} alt='Loading...'/>
        </div>
    )
}

export default Loader

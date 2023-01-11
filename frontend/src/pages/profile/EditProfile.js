import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import Loader from '../../components/loader/Loader'
import { selectUser } from '../../redux/features/auth/authSlice'
import './Profile.scss'
import {toast} from 'react-toastify'
import { updateUser } from '../../services/authService'
import ChangePassword from '../../components/changepassword/ChangePassword'


const EditProfile = () => {

    const user=useSelector(selectUser)
    const naviatge=useNavigate()

    const initialState=
    {
        name:user?.name,
        email:user?.email,
        bio:user?.bio,
        phone:user?.phone,
        photo:user?.photo
    }

    const[isLoading,setIsLoading]=useState(false)
    const[profile,setProfile]=useState(initialState)
    const[profileImage,setProfileImage]=useState('')
    
    const {email}=user

    // if user refresh the page, data in user will be lost
    // hence we will navigate it back to profile page, instead of again fetching the data

    useEffect(()=>{
        if(!email)
        {
            naviatge('/profile')
        }
    },[email,naviatge])
    

    const handleInputChange=(e)=>
    {
        const {name,value}=e.target;

        // get the initial state, then set the [name]'s value to value
        setProfile({...profile,[name]:value}); 
    }

    const handleImageChange=(e)=>
    {
        setProfileImage(e.target.files[0])
    }

    const saveProfile=async(e)=>
    {
        e.preventDefault()
        setIsLoading(true)

        try
        {
            // handle image upload to cloudinary
            let imageURL;

            if(profileImage && 
                (profileImage.type==='image/png' || profileImage.type==='image/jpeg' || profileImage.type==='image/jpg')
            )
            {
                const image=new FormData()
                image.append('file',profileImage)
                image.append('cloud_name','dlxxtbo3x')
                image.append('upload_preset','jbqaktsd')

                // first save image to cloudnary
                const response=await fetch(
                    'https://api.cloudinary.com/v1_1/dlxxtbo3x/image/upload',
                    {method:'post',body:image}
                );

                const imageData=await response.json() // contain image URL to save to DB
                
                imageURL=imageData.url.toString()
            }

            // save profile

            const formData=
            {
                name:profile.name,
                phone:profile.phone,
                bio:profile.bio,
                photo:profileImage?imageURL:profile.photo
            }

            const data=await updateUser(formData);


            toast.success("User updated!")
            naviatge('/profile')
            
            setIsLoading(false)
        }
        catch(err)
        {
            setIsLoading=false
            toast.error(err.message)
        }
    }

  return (
    <div className='profile --my2'>
      {isLoading && <Loader/>}


      <Card cardClass={"card --flex-dir-column"}>
            <span className='profile-photo'>
                <img src={user?.photo} alt='profilepic'/>
            </span>
            <form className='--form-control --m' onSubmit={saveProfile}>
            <span className='profile-data'>
                <p>
                    <label>Name: </label>
                    <input type='text' name='name' value={profile?.name} onChange={handleInputChange}/>
                </p>

                <p>
                    <label>Email: </label>
                    <input type='text' name='email' value={profile?.email} disabled/>
                    
                    <code>Email cannot be changed!</code>
                </p>

                <p>
                    <label>Phone: </label>
                    <input type='text' name='phone' value={profile?.phone} onChange={handleInputChange}/>
                </p>

                <p>
                    <label>Bio: </label>
                    <textarea name='bio' value={profile?.bio} onChange={handleInputChange} cols='30' rows='10'/>
                </p>

                <div>
                    <label>Photo: </label>
                    <input type='file' name='Image' onChange={handleImageChange}/>
                </div>

                <button className='--btn --btn-primary'>
                    Edit Profile
                </button>
            </span>
            </form>
        </Card>
        
        <br/>
        <ChangePassword/>
    </div>
  )
}

export default EditProfile

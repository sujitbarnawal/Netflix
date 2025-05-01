/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import cover_page from "../assets/cover_image.jpg"
import {useNavigate} from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast';
import {useNetflixStore} from '../../store/netflixStore';


const Signup = () => {

  const navigate=useNavigate()
  const {user}=useNetflixStore()

  const [loading,setLoading]=useState(false)

  const [input,setInput]=useState({
    fullname:"",
    email:"",
    password:""
  })

  const getInput=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`,input,{
        withCredentials:true
      })
      if(response.data.success){
        navigate('/login')
        toast.success(response.data.message)
        // console.log(response.data.message)
      }
    } catch (error) {
      // console.log(error)
      toast.error(error.response?.data?.message)
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
      if(user){
        navigate('/')
      }
    },[ ])

  
  return (
    <div>
      <Navbar/>
      <div className='absolute'>
        <img className='w-screen h-screen' src={cover_page} alt="cover" />
      </div>
      
      <form onSubmit={handleSubmit} className=' w-[20rem] sm:w-[25rem] absolute top-[50%] left-[50%] transform-[translate(-50%,-50%)] bg-black opacity-60 rounded-md p-5 '>
        <h1 className='text-3xl font-bold text-center text-white'>SignUp</h1>
        <div className=' flex flex-col mt-2 px-10 text-lg'>
          <label className='text-white' htmlFor="fullname">Full Name</label>
          <input onChange={getInput} className='outline-white border-white border-2 rounded-md text-white p-2 mt-2' type="text" name='fullname' id='fullname' />
        </div>
        <div className='flex flex-col mt-2 px-10 text-lg'>
          <label className='text-white' htmlFor="email">Email</label>
          <input onChange={getInput} className='outline-white border-white border-2 rounded-md text-white p-2 mt-2' type="email" name='email' id='email' />
        </div>
        <div className='flex flex-col mt-2 px-10 text-lg'>
          <label className='text-white' htmlFor="password">Password</label>
          <input onChange={getInput} className='outline-white border-white border-2 rounded-md text-white p-2 mt-2 mb-4' type="password" name='password' id='password' />
        </div>
        <div className='flex flex-col  px-10 text-lg'>
          {loading ? 
          <button type='submit' className='bg-netflix p-2 rounded-md text-white cursor-pointer'>Please wait.....</button>:
          <button type='submit' className='bg-netflix p-2 rounded-md text-white cursor-pointer' >Signup</button>  
          }
          
        </div>
        <div className='flex flex-col  px-10 text-lg'>
          <p className='text-white'>Already have an account? <span onClick={()=>navigate('/login')} className='text-netflix cursor-pointer font-bold'>Login</span></p>
        </div>
      </form>
    </div>
  )
}

export default Signup;

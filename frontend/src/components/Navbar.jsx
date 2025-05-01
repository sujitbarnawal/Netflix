import React, { useState } from "react";
import logo from "../assets/Netflix_2015_logo.svg.png";
import { IoIosArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import {useNetflixStore} from "../../store/netflixStore";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {

  
  const navigate =useNavigate()

  const {user,setUser,setToggle,toggle}=useNetflixStore()

  const [openBox,setOpenBox]=useState(false)

  const logout=async()=>{
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`)
      if(response.data.success){
        // console.log(response.data.message)
        toast.success(response.data.message)
        navigate('/')
        setUser(null)
      }
    } catch (error) {
      // console.log(error)
      toast.error(error.response?.data?.message)
    }
  }

  const handleSearch=()=>{
    setToggle(true)
    navigate('/browse')
  }

  const handleBack=()=>{
    setToggle(false)
    navigate('/')
  }

  return (
    <>
    <div className="bg-gradient-to-b from-black w-[100%] px-4  absolute z-10">
      <div className="max-w-[90rem] mx-auto flex items-center justify-between py-5">
        <div >
          <img onClick={()=>navigate('/')} className="w-[7rem] sm:w-[10rem] sm:p-2 p-0  cursor-pointer" src={logo} alt="logo" />
        </div>
        {
          user ? (<div className="flex items-center">
            <IoIosArrowDropdown onClick={()=>setOpenBox(true)} className="sm:hidden" size={"24px"} color="white" />
            <h1 className="text-lg ml-1 font-medium text-white">{user?.fullname}</h1>
            <div className="ml-4 hidden sm:flex">
              <button onClick={logout} className="bg-netflix mx-2 text-white p-2 rounded-[4px] cursor-pointer">
                Logout
              </button>
              {toggle?
              <button onClick={handleBack} className="bg-netflix mx-2 text-white p-2 rounded-[4px] cursor-pointer">
                Home
              </button>:
              <button onClick={handleSearch} className="bg-netflix mx-2 text-white p-2 rounded-[4px] cursor-pointer">
                Search movie
              </button>
              }
              
            </div>
          </div>):(
            <button onClick={()=>navigate('/login')} className="bg-netflix mx-2 text-white p-1 text-lg rounded-[4px] cursor-pointer">
            Sign in
          </button>
          )
        }
        
      </div>
    </div>
    {openBox && 
      <div className="sm:hidden w-1/2 z-10 absolute top-[10%] right-5 p-5 bg-white flex flex-col ">
          <div className="flex items-center justify-between">
           <p className="text-lg font-bold"> {user?.fullname.split(" ")[0]}</p>
           <p onClick={()=>setOpenBox(false)} className="text-lg font-bold">x</p>
          </div>
          <p onClick={logout} className="mt-4 hover:underline text-lg font-semibold">Logout</p>
          {!toggle?
          <p onClick={handleSearch} className="hover:underline text-lg font-semibold">Search movie</p>:
          <p onClick={handleBack} className="hover:underline text-lg font-semibold">Home</p>
          }
          
      </div>
    }
    </>
    
  );
};

export default Navbar;

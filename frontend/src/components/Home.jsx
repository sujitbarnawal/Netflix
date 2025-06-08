import React from 'react'
import Navbar from './Navbar';
import cover_page from "../assets/cover_image.jpg"
import { FaChevronRight } from "react-icons/fa";
import {useNetflixStore} from '../../store/netflixStore';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const {user}=useNetflixStore()
  const navigate=useNavigate()
  return (
    <div>
       <Navbar/>
      <div className='relative'>
        <img className='w-screen h-[100dvh] object-cover' src={cover_page} alt="cover" />
        <div className='absolute left-[50%] top-[50%] transform-[translate(-50%,-50%)] '>
          <h1 className={`font-extrabold text-5xl md:text-6xl text-white ${user?"text-left":"text-left"} sm:text-left `} >Unlimited  movies, <br />TV shows, and more</h1>
          {
            user ? 
            (<>
            <p className='mt-5 text-white text-lg'>Ready to watch? Browse through the content.</p>
            <button onClick={()=>navigate('/browse')} className='text-white py-4 mt-4 bg-netflix text-2xl px-5 flex items-center gap-3 rounded-md cursor-pointer'>Browse<FaChevronRight size={"20px"} />
            </button>
            </>):
            (<>
            <p className='text-[20px] font-bold mt-2 text-white text-left sm:text-center'>Starts at USD 2.99. Cancel anytime.</p>
          <p className='mt-5 text-white text-lg'>Ready to watch? Enter your email to create or restart your membership.</p>
          <div className='mt-5 flex flex-col md:flex-row  '>
            <input type="email" className='border border-gray-600 bg-black opacity-70 text-white w-[15rem] md:w-[22rem] h-[3.5rem] p-2 text-xl rounded-md' placeholder='Email Address' />
            <button className='text-white mt-5 md:mt-0 py-4 px-[20%] w-[15rem] md:w-[10rem] text-center bg-netflix text-2xl md:py-0 md:px-5 md:ml-3 flex items-center gap-3 rounded-md cursor-pointer'>GetStarted<FaChevronRight size={"20px"} />
            </button>
          </div>
            </>)
          }
          
        </div>
      </div>
      
    </div>
  )
}

export default Home

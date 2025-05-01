import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Login from './Login'
import Signup from './Signup'
import Browse from './Browse'
import Home from './Home'
 

const Body = () => {

  const router= createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/login',
      element: <Login/>
    },
    {
      path:'/signup',
      element: <Signup />
    },{
      path:'/browse',
      element:<Browse />
    }
  ])

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default Body

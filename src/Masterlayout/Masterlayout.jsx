import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Masterlayout({isLogin,setIsLogin,userName}) {
  return (
    <>
   <Navbar isLogin={isLogin} setIsLogin={setIsLogin} userName={userName}/>
    <Outlet></Outlet>
    </>
  )
}

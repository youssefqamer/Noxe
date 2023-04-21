import React, { useState } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './Home/Home';
import Masterlayout from './Masterlayout/Masterlayout';
import Register from './Register/Register';
import About from './About/About';
import Movies from './Movies/Movies';
import Tvshows from './Tvshows/Tvshows';
import People from './People/People';
import Login from './Login/Login';
import MovieDetails from './MovieDetails/MovieDetails';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import NotFound from './NotFound/NotFound';

export default function App() {
  let [isLogin,setIsLogin]=useState(false)
  let [userName,setUserName]=useState('')

  const routes= createHashRouter([
    {path :'/',element:<Masterlayout userName={userName} isLogin={isLogin} setIsLogin={setIsLogin}/>, children:[
      {index :true,element:<ProtectedRoute><Home/></ProtectedRoute> },
      {path :'login',element:<Login setIsLogin={setIsLogin}/>},
      {path:'signUp',element:<Register/>},
      {path :'movieDetails/:mediaType/:movieId',element:<ProtectedRoute><MovieDetails/></ProtectedRoute>} ,
      {path :'about',element:<ProtectedRoute><About/></ProtectedRoute> },
      {path :'movies',element:<ProtectedRoute><Movies/></ProtectedRoute>},
      {path :'tvshows',element:<ProtectedRoute><Tvshows/></ProtectedRoute>},
      {path :'people',element:<ProtectedRoute><People/></ProtectedRoute>},
      {path :'*',element:<NotFound/>},
    ]}
  ])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      let token=localStorage.getItem('token')
      let userData=jwtDecode(token)
     setUserName(userData.first_name)
     setIsLogin(true)
    }
  }, [isLogin])
  
  return (
    <>
<RouterProvider router={routes}/>
    
    </>
  )
}


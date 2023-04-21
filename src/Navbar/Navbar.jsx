import React from 'react'
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { mediaContext } from './../Context/Store';
export default function Navbar({isLogin,setIsLogin,userName}) {
  let {search}=useContext(mediaContext)
  let navigate=useNavigate()
  let logOut=()=>{
    setIsLogin(false)
    navigate('/login')
    localStorage.removeItem('token')
  }
  return (
    <>
  <nav className="navbar navbar-expand-lg navbar-dark  shadow ">
  <div className="container">
    <a className="navbar-brand">Noxe</a>
    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="collapsibleNavId">
    {isLogin? <ul className="navbar-nav me-auto mt-2 mt-lg-0">
      <li className="nav-item">
          <NavLink  className={({ isActive}) => {
    return isActive ? "text-info nav-link" : 'nav-link';
  }} aria-current="page" to=''>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive}) => {
    return isActive ? "text-info nav-link" : 'nav-link';
  }} to='movies'>Movies</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive}) => {
    return isActive ? "text-info nav-link" : 'nav-link';
  }} to='tvshows'>Tvshows</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive}) => {
    return isActive ? "text-info nav-link" : 'nav-link';
  }}to='people'>Person</NavLink>
        </li>
      </ul>:''}
     
      <ul className="navbar-nav ms-auto mt-2 mt-lg-0  ">
     {isLogin? <>
<input type="text"  className='form-control me-2 mb-2 w-50' placeholder='Search' onChange={(e)=>search(e)}/>
        <div className="social-icons  d-flex align-items-center">
          <i className='fab fa-facebook mx-2'></i>
          <i className='fab fa-spotify mx-2'></i>
          <i className='fab fa-instagram mx-2'></i>
          <i className='fab fa-youtube mx-2'></i>
        </div></>:''}
     {!isLogin?<>
      <li className="nav-item">
          <NavLink className={({ isActive}) => {
    return isActive ? "text-info nav-link " : 'nav-link';
  }} to='signUp'>Signup</NavLink>
        </li>
     </>:''} 
        
        {!isLogin?<>  <li className="nav-item">
          <NavLink className={({ isActive}) => {
    return isActive ? "text-info nav-link " : 'nav-link';
  }} to='login'>Login</NavLink>
        </li></>:''}
      
        {isLogin? <>
        <li className="nav-item">
          <NavLink onClick={logOut} className={({ isActive}) => {
    return isActive ? "text-info nav-link " : 'nav-link';
  }} to='login'>Logout</NavLink>
        </li></>:""}
        <li className="nav-item">
          <NavLink  className={({ isActive}) => {
    return isActive ? " nav-link " : 'nav-link';
  }} >{isLogin?userName:''}</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

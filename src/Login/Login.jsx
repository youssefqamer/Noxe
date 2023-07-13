import axios from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
export default function Login({setIsLogin}) {
  const [user,setuser]=useState({
    email:'',
    password:'',
  })
  const [errorMsg,setErrorMsg]=useState('')
  const [errorDetails,setErrorDetails]=useState([])
  let [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  let getInputValue=(e)=>{
    let myUser={...user}
    myUser[e.target.name]=e.target.value
    setuser(myUser)
  }
  let submitData=async(e)=>{
    e.preventDefault();
    setErrorMsg('')
    setErrorDetails('')
    setIsLoading(true)
   let validationResponse= validation()
    if(validationResponse.error === undefined){
      let{data}=await axios.post(`https://movies-api.routemisr.com/signin`,user)
      setIsLoading(false)
      if(data.message==='success'){
        localStorage.setItem('token',data.token)
        setIsLogin(true)
     navigate('/')
      
    }else{
      setErrorMsg(data.message)
    }
     }else{
      setErrorDetails(validationResponse.error.details)
      }
   
}

  let validation=()=>{
    const rules=Joi.object({
      email:Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password:Joi.string().required().pattern(new RegExp(/^[a-z][0-9]{5}$/)),
      
    })
return rules.validate(user,{abortEarly:false})
    
  }
let showErrors=(inputName)=>{
  let errors=errorDetails.filter((err)=>{return err.message.includes(inputName)})
  if (errors[0]!==undefined) {
    return <div className='alert alert-danger'>{errors[0].message}</div>
  }
}

  return (
    <>
     <div className=' py-5 m-auto w-75 px-2'>
    <h2>Login form</h2>
    {errorMsg ?<div className='alert alert-danger p-2 '>{errorMsg}</div>:''}
    <form onSubmit={submitData}>
    <div className="input-data my-2">
    <label htmlFor="email">Email:</label>
    <input onChange={getInputValue} type="email" className='form-control my-2' name='email' />
    {errorDetails.length>0?showErrors('email'):''}
    </div>
    <div className="input-data my-2">
    <label htmlFor="pass">Password:</label>
    <input onChange={getInputValue} type="password" className='form-control my-2' name='password' />
    {errorDetails.length>0?showErrors('password'):''}
    </div>
    <button  className={`btn btn-info float-end my-4` + (isLoading&&errorDetails.length===0?'disabled':'')}>{isLoading&&errorDetails.length===0?<i className="fa-solid fa-spinner fa-spin"></i>:'login'}</button>

    <div className="clear-fix"></div>
    </form>
   </div>
    </>
  )
  }



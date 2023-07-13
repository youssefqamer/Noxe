import axios from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
export default function Register() {
  const [user,setuser]=useState({
    first_name:'',
    last_name:'',
    age:'',
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
      let{data}=await axios.post(`https://movies-api.routemisr.com/signup`,user)
      setIsLoading(false)
      if(data.message==='success'){
        navigate('/login')
    }else{
      setErrorMsg(data.errors.email.message)
    }
     }else{
      setErrorDetails(validationResponse.error.details)
      }
}

  let validation=()=>{
    const schema=Joi.object({
      first_name:Joi.string().alphanum().required().min(2).max(10),
      last_name:Joi.string().alphanum().required().min(2).max(10),
      email:Joi.string().required().email({tlds:{allow:['com','net']}}),
      age:Joi.number().min(16).max(100).required(),
      password:Joi.string().min(6).max(15).required().pattern(new RegExp(/([a-z]|[A-Z])/))
    })
return schema.validate(user,{abortEarly:false})
    
  }

let showErrors=(inputName)=>{
  let errors=errorDetails.filter((err)=>{return err.message.includes(inputName)})
if (errors[0]!==undefined&&errors[0].message.includes('password')) {
  return <div className='alert alert-danger py-1'>Password must  start with letter then 5 numbers</div>
}else if(errors[0]!==undefined){
   return <div className='alert alert-danger py-1'>{errors[0].message}</div>
}
}
  return (
    <>
     <div className=' py-5 m-auto w-75 px-2'>
    <h2>Registeration form</h2>
    {errorMsg ?<div className='alert alert-danger p-2 '>{errorMsg}</div>:''}
    <form onSubmit={submitData}>
    <div className="input-data my-2">
    <label htmlFor="first_name">First-name:</label>
    <input onChange={getInputValue} type="text" className='form-control my-2' name='first_name' />
    {errorDetails.length>0?showErrors('first_name'):''}
    </div>
    <div className="input-data my-2">
    <label htmlFor="last-name">Last-name:</label>
    <input onChange={getInputValue} type="text" className='form-control my-2' name='last_name' />
    {errorDetails.length>0?showErrors('last_name'):''}
    </div>
    <div className="input-data my-2">
    <label htmlFor="age">Age:</label>
    <input onChange={getInputValue} type="text" className='form-control my-2' name='age' />
    {errorDetails.length>0?showErrors('age'):''}
    </div>
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
    <button  className={`btn btn-info float-end my-4 ` + (isLoading&&errorDetails.length===0?'disabled':'')}>{isLoading&&errorDetails.length===0?<i className="fa-solid fa-spinner fa-spin"></i>:'Register'}</button>

    <div className="clear-fix"></div>
    </form>
   </div>
    </>
  )
  }

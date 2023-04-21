import axios from "axios";
import { createContext,useEffect, useState } from "react";
export let mediaContext=createContext(null)


export default function MediaContextProvider(props){
const [movieContainer,setMovieContainer]=useState([])
const [personContainer,setPersonsContainer]=useState([])
const [tvContainer,setTvContainer]=useState([])
const [loading,setLoading]=useState(false)

let getData=async(mediaType,setFunc,pageNumber)=>{
  setLoading(true)
let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=b3e706c7ed2ac18bd470888caaece32e&page=${pageNumber}`)
setFunc(data.results)
setLoading(false)
}
useEffect(() => {
getData('movie',setMovieContainer,1)
getData('tv',setTvContainer,1)
getData('person',setPersonsContainer,1)
}, [setMovieContainer,setPersonsContainer,setTvContainer])
let pagination=(clicked,page)=>{
   
getData('movie',setMovieContainer,page)
getData('tv',setTvContainer,page)
getData('person',setPersonsContainer,page)
}
let search=async(e)=>{
let searchValue=e.target.value
if (searchValue) {
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <span className="loader"></span>
        </div>
    let {data}=await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=b3e706c7ed2ac18bd470888caaece32e&language=en-us&query=${searchValue}&page=1&include_adult=false`)
console.log(data.results);
setMovieContainer(data.results)
setTvContainer(data.results)
setPersonsContainer(data.results)
}else{
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <span className="loader"></span>
        </div>
getData('movie',setMovieContainer,1)
getData('tv',setTvContainer,1)
getData('person',setPersonsContainer,1)
}

}
return <mediaContext.Provider value={{movieContainer,tvContainer,personContainer,pagination,search,loading,setLoading}}>
{props.children}
</mediaContext.Provider>
 }
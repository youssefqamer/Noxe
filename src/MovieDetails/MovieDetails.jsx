import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Offline} from "react-detect-offline";
import Disconnect from '../Disconnect/Disconnect';
import { useContext } from 'react';
import { mediaContext } from './../Context/Store';
import Loading from '../Loading/Loading';
export default function MovieDetails() {
    let {movieId,mediaType}=useParams()
  let [details,setDetails]=useState({})
  let {loading,setLoading}=useContext(mediaContext)

     let getMovieDetails= async(id,media)=>{
      setLoading(true)
        let {data}=await axios.get(`https://api.themoviedb.org/3/${media}/${id}?api_key=b3e706c7ed2ac18bd470888caaece32e&language=en-US`)
        console.log(data);
        setDetails(data)
        setLoading(false)
    }
    useEffect(() => {
     getMovieDetails(movieId,mediaType)
    }, [])
  return (
   <>
   <div className="container mt-5 mb-2">
   <Offline><Disconnect/></Offline>
    <div className="row">
      <div className="col-md-4">
        <div>
          {mediaType==='person'?<img src={`https://image.tmdb.org/t/p/w500${details.profile_path}`} alt=""  className='img-fluid rounded-1'/>
:<img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt=""  className='img-fluid rounded-1'/>}
        </div>
      </div>
      <div className="col-md-8 pt-3">
    <h4>{details.original_title}{details.name}</h4>
    <p className='text-muted'>{details.tagline}</p>
    {details.genres?.map((gener,index)=> <span key={index} className='bg-info p-2 rounded-2 me-2 '>{gener.name}</span>)}
    {mediaType!=='person'?<p className='py-2 mt-3'>Vote : {details.vote_average}</p>:''}
    {mediaType==='person'?<p>known_for_department : {details.known_for_department}</p>:<p className='py-2'>Vote Count : {details.vote_count}</p>}
    <p className='py-2'>Popularity: {details.popularity}</p>
    {mediaType==='person'?'' :mediaType==='tv'?<p className='py-2'>first_air_date : {details.first_air_date}</p>:<p className='py-2'>relase date: {details.release_date}</p>}
    <p className='text-muted'>{details.overview}{details.biography}</p>
      </div>
    </div>
   </div>
   {loading===true?<Loading/>:null}
   </>
  )
}


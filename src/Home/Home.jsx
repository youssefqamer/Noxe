import React, {useContext } from 'react'
import { Link } from 'react-router-dom';
import { mediaContext } from './../Context/Store';
import { Offline} from "react-detect-offline";
import Disconnect from '../Disconnect/Disconnect';
import Loading from '../Loading/Loading';

export default function Home() {
let {movieContainer,tvContainer,personContainer,loading}=useContext(mediaContext)

  return (
    <>
     <Offline><Disconnect/></Offline>
    <div className="container mt-5 mb-3">
      <div className="row g-3" >
        {/* movies */}
        
          <div className="col-md-4 d-flex flex-column justify-content-center ">
         <div className='w-25'><hr /></div>
          <h2>Trending <br/> Movies <br/> to watch now </h2>
          <p className='text-muted'>most watched movies by days</p>
          <div className='w-75'><hr /></div>
        </div>
        {movieContainer.slice(0,16).map((movie)=>
        <div className="col-md-2 " key={movie.id}>
          <div className='position-relative'>
          <Link to={`/movieDetails/${movie.media_type}/${movie.id}`}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""  className='img-fluid'/>
          </Link>
          <h6>{movie.title}</h6>
          <div className='position-absolute end-0 top-0 bg-info p-1 rounded-1'>{Math.floor(movie.vote_average)}</div>
          
          </div>
        </div> 
        )} 
      


     {/* tv */}
        
          <div className="col-md-4 d-flex flex-column justify-content-center ">
         <div className='w-25'><hr /></div>
          <h2>Trending <br/> tv <br/> to watch now </h2>
          <p className='text-muted'>most watched tv by days</p>
          <div className='w-75'><hr /></div>
        </div>
            {tvContainer.slice(0,16).map((tv)=>
        <div className="col-md-2 " key={tv.id}>
          <div className='position-relative'>
          <Link to={`/movieDetails/${tv.media_type}/${tv.id}`}>
          <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt=""  className='img-fluid'/>
         </Link>
          <h6>{tv.name}</h6>
          <div className='position-absolute end-0 top-0 bg-info p-1 rounded-1'>{Math.floor(tv.vote_average)}</div>
          </div>
        </div> 
        )}
       


        {/* person */}
        
          <div className="col-md-4 d-flex flex-column justify-content-center ">
         <div className='w-25'><hr /></div>
          <h2>Trending <br/> person <br/> to watch now </h2>
          <p className='text-muted'>most watched person by days</p>
          <div className='w-75'><hr /></div>
        </div>
        {personContainer.slice(0,16).map((person)=>
        <div className="col-md-2 " key={person.id}>
          <div className='position-relative'>
          <Link to={`/movieDetails/${person.media_type}/${person.id}`}>
          <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt=""  className='img-fluid'/>
         </Link>
          <h6>{person.name}</h6>
          <div className='position-absolute end-0 top-0 bg-info p-1 rounded-1'>{Math.floor( person.popularity)}</div>
          </div>
        </div> 
        )}
      </div>
      {loading===true?<Loading/>:null}
    </div>
    </>
  )
}

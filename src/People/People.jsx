import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { mediaContext } from './../Context/Store';
import Pagination from '@mui/material/Pagination';
import { Offline} from "react-detect-offline";
import Disconnect from '../Disconnect/Disconnect';
import Loading from './../Loading/Loading';
export default function People() {
  let {pagination,personContainer,loading}=useContext(mediaContext)
  return (
<>
<div className="container mt-5 mb-3">
<Offline><Disconnect/></Offline>
  <div className="row g-3" >
      {personContainer.map((person)=>
        <div className="col-md-2 " key={person.id}>
          <div className='position-relative'>
            <Link to={`/movieDetails/${person.media_type}/${person.id}`}>
         {person.profile_path===null?<img src='https://image.tmdb.org/t/p/w500/oTB9vGIBacH5aQNS0pUM74QSWuf.jpg' alt='' className='img-fluid'/>:   
            person.profile_path&&person.media_type==='person'?<img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt=""  className='img-fluid'/>
:<img src={`https://image.tmdb.org/t/p/w500${person.poster_path}`} alt=""  className='img-fluid'/>}
            </Link>
          <h6>{person.name}</h6>
          <div className='position-absolute end-0 top-0 bg-info p-1 rounded-1'>{Math.floor(person.popularity)}</div>
          </div>
        </div> 
        )}
</div>
 
</div>

{/*  */}
<div className='  d-flex justify-content-center m-auto mb-4 mt-3'>
    <Pagination count={100} color="secondary" onChange={pagination}/>
</div>
{loading===true?<Loading/>:null}
</>
    
  )
}

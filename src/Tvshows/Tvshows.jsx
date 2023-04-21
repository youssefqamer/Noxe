import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { mediaContext } from './../Context/Store';
import Pagination from '@mui/material/Pagination';
import { Offline} from "react-detect-offline";
import Disconnect from '../Disconnect/Disconnect';
import Loading from '../Loading/Loading';
export default function Tvshows() {

   let {pagination,tvContainer,loading}=useContext(mediaContext)
  return (
<>
<div className="container mt-5 mb-3">
<Offline><Disconnect/></Offline>
  <div className="row g-3" >
      {tvContainer.map((tv)=>
        <div className="col-md-2 " key={tv.id}>
          <div className='position-relative'>
            <Link to={`/movieDetails/${tv.media_type}/${tv.id}`}>
     {tv.poster_path?<img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt=""  className='img-fluid'/>
:<img src='https://image.tmdb.org/t/p/w500/iPPFBfCxcxIHH6JdavjyOIXMj1O.jpg' alt=""  className='img-fluid'/>
}         
            </Link>
          <h6>{tv.name}</h6>
          <div className='position-absolute end-0 top-0 bg-info p-1 rounded-1'>{Math.floor(tv.vote_average)}</div>
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

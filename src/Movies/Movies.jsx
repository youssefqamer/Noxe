
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { mediaContext } from './../Context/Store';
import Pagination from '@mui/material/Pagination';
import { Offline} from "react-detect-offline";
import Disconnect from '../Disconnect/Disconnect';
import Loading from './../Loading/Loading';




export default function Movies() {
  // let [movieContainer,setMovieContainer]=useState([])
  // let getData=async(mediaType,setFunc)=>{
  //   let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=b3e706c7ed2ac18bd470888caaece32e`)
  //   console.log(data.results);
  //   setFunc(data.results)
  // }
  // useEffect(() => {
  //   getData('movie',setMovieContainer)
  //   }, [])
let {movieContainer,pagination,loading}=useContext(mediaContext)
// let {pageLsit}=useContext(paginationContext)
  return (
<>
<Offline><Disconnect/></Offline>
        <div className="container mt-5 mb-3">
        <div className="row g-3" >
      {movieContainer.map((movie)=>
        <div className="col-md-2 " key={movie.id}>
          <div className='position-relative'>
            <Link to={`/movieDetails/${movie.media_type}/${movie.id}`}>
       {movie.poster_path?<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""  className='img-fluid'/>
:<img src=' https://image.tmdb.org/t/p/w500/kuf6dutpsT0vSVehic3EZIqkOBt.jpg' alt=""  className='img-fluid'/>} 
            </Link>
          <h6>{movie.title}</h6>
          <div className='position-absolute end-0 top-0 bg-info p-1 rounded-1'>{Math.floor(movie.vote_average)}</div>
          </div>
        </div> 
        )}
</div></div>
 {/*  */}

{/*  */}
<div className='d-flex justify-content-center m-auto mb-4 mt-3'>
    <Pagination count={100} color="secondary" onChange={pagination}/>
</div>
{loading===true?<Loading/>:null}

</>
    
  )
}

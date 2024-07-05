import React,{useState,useEffect} from 'react'
import axios from 'axios';
const BASEURL = "http://localhost:4500/movies";


export const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        axios.get(BASEURL)
       .then(res => {
        // console.log(res);
        setMovies(res.data)})
       .catch(err => console.log(err));
    },[]);

  return (
    <>
    <h1>Movies List</h1>
    <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
        {   
            movies.map((movie, index) => (
                <div key={index} style={{flexBasis:'500px',border:'1px ridge'}}>
                    <h3>{movie.title}</h3>
                    <p>{movie.plot}</p>
                    <p>{movie.genre}</p>
                    <p>{movie.duration}</p>
                    <p>{movie.releaseDate}</p>
                </div>
            ))
        }
    </div>
    </>
  )
}

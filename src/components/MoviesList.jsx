import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { SyncLoader } from 'react-spinners'

const MoviesList = () => {

  const [movieData, setMovieData] = useState([]);
  const [isLoading , setIsLoading] = useState(false)
 

  async function fetchMovies() {
    setIsLoading(true)
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`)
      setMovieData(response.data.results)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  } 



  return (
    <div className='min-h-screen bg-gray-900 text-white p-6'>
      <h2 className='text-3xl text-center mb-6 font-bold'>
           🎥 Popular Movies
      </h2> 
      <div className='flex justify-center mb-6'>


        <button className="mt-3 px-6 py-2 rounded-lg shadow-md transition bg-blue-600 hover:bg-blue-800 text-white" onClick={fetchMovies}>
            Search
        </button>
      </div>

      {isLoading && <SyncLoader color='#ffffff' style={{display : 'flex' , justifyContent :'center' , alignItems : 'center'}} />}
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {
        movieData.map((item) => (
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition">
            <img
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={item.poster_path}
              className='w-full h-80 object-cover'
            />
            <div className='p-4'>
                <h3 className='text-lg font-semibold'>
                    {item.original_title}
                </h3>
                <p className='text-sm text-gray-400'>{item.overview}</p>
                <p>⭐ {item.vote_average} 📅 {item.release_date}</p>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default MoviesList
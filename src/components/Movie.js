import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Movie = ({ movie }) => {
     // Context
     const { 
         addMovieToWatchlist, 
         watchlist, 
         addMovieToWatched, 
         watched 
     } = useContext(GlobalContext);

     let storedMovie = watchlist.find(o => o.id === movie.id);
     let storedMovieWatched = watched.find(o => o.id === movie.id);

     const watchlistDisabled = storedMovie ? true : storedMovieWatched ? true : false;

     const watchedDisabled = storedMovieWatched ? true : false;

    return (
        <a className="blog" target="_blank">
        <div>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}>

            </img>
            <span>
                {movie.title} {movie.vote_average}
            </span>
            <div className="controls">
                <button 
                    className="btn" 
                    disabled={watchlistDisabled}
                    onClick={() => addMovieToWatchlist(movie)}
                > 
                    Add to Watchlist 
                </button> 

                <button 
                    className="btn" 
                    disabled={watchedDisabled}
                    onClick={() => addMovieToWatched(movie)}
                > 
                    Add to Watched 
                </button> 
            </div>
        </div>
        </a>
    )
}

export default Movie;
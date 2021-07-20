import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Navbar from "./Navbar";
import MovieCard from "./Moviecard";

const Watched = () => {

    const {watched} = useContext(GlobalContext);
    
    return (
        <div>
            <Navbar />
            <div className="movie-page">
                <div className="container">
                    <div className="header">
                        <h1 className="heading">
                            Watched Movies
                        </h1>
                        <br>
                        </br>
                        <br>
                        </br>
                        {watched.length > 0 ? (
                            <div className="movie-grid">
                                {watched.map((movie) => (
                                    <MovieCard movie={movie} type="watched"/>
                                ))}
                            </div>
                        ) : (
                            <h2 className="no-movies"> No movies in your list, add some </h2>
                        )}

                    </div>
                </div> 
            </div>
            
        </div>
    )
}

export default Watched;
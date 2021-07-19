import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Navbar from "../components/navbar";
import MovieCard from "../components/moviecard";

const Watchlist = () => {
    const {watchlist} = useContext(GlobalContext);
    const {watched} = useContext(GlobalContext);

    return (
        <div>
            <Navbar />
            <div className="movie-page">
                <div className="container">
                    <div className="header">
                        <h1 className="heading">
                            My Watchlist
                        </h1>

                        <span className="count-pill">
                            {watched.length} {watchlist.length === 1 ? 'Movie': 'Movies'}
                        </span>
                        <br>
                        </br>
                        <br>
                        </br>
                        {watchlist.length > 0 ? (
                            <div className="movie-grid">
                                {watchlist.map((movie) => (
                                    <MovieCard movie={movie} type="watchlist"/>
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

export default Watchlist;

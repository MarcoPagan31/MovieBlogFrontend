import GoogleLogin from 'react-google-login';
import React, { useContext } from 'react';
import "../styling/home.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSignedIn, selectUserInput, setSignedIn, setUserData } from "../features/userSlice";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import "../styling/blogs.css";
import "../styling/moviehome.css";
import { GlobalContext } from '../context/GlobalState';
import Movie from '../components/movie';

const Moviehome = () => {

    // Redux
    const dispatch = useDispatch();
    const isSignedIn = useSelector(selectSignedIn);
    const searchInput = useSelector(selectUserInput);

    // Movie State
    const api_key = "405c57488ea53adb79ee5959addc22ac";
    const [movies, setMovies] = useState();
    const [loading, setLoading] = useState(true);

    // Fetch movie data
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchInput}&page=1&include_adult=false`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
                setLoading(false);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    // Movie Data
    return (
        <div>
            <Navbar />
            <div>
            <h1> Movie Home </h1>
            {loading ? <h1 className="loading"> Loading...</h1>: ""}
            <div className='movie-info'>
                {movies?.results.filter((movie) => {
                    if (searchInput == "") {
                        return movie;
                    } else if (movie.title.toLowerCase().includes(searchInput.toLowerCase())){
                        return movie;
                    }
                }).map(movie => (
                    <Movie movie={movie} />
                ))}
            </div>
        </div>
        </div>
    )
}

export default Moviehome;
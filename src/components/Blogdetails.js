import React, { useState, useEffect } from 'react';
import { setBlogData } from '../features/UserSlice';
import {
    selectSignedIn,
    selectUserData,
    setInput,
    setSignedIn,
    setUserData,
    selectUserInput
  } from "../features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import "../styling/blogs.css";
import { useLocation } from "react-router";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Link } from "react-router-dom";
import ReactHTMLParser from "react-html-parser";

const Blogs = () => {
    const searchInput = useSelector(selectUserInput);
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState();
    const [loading, setLoading] = useState(true);
    const isSignedIn = useSelector(selectSignedIn)
    const location = useLocation();

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: location.state.title,
                description: location.state.description,
                body: location.state.body,
                author: location.state.author,
                comment: location.state.comment
            }),
        };
        fetch("api/v1/blog/blogbytitle", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                dispatch(setBlogData(data));
                setBlogs(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [searchInput]);

    return (
        <div>
            <Navbar />
            <div className="blog__page">
                    <div>
                        <h3 className="sourceName">
                            <span>
                                {location.state.title}
                            </span>
                            <Link to={{ 
                                pathname: '/updateblog', 
                                state: {
                                    title: location.state.title,
                                    description: location.state.description,
                                    body: location.state.body,
                                    author: location.state.author,
                                    comment: location.state.comment
                                }}}>
                                <button className="logout__button">
                                    Update Blog
                                </button>
                            </Link>
                        </h3>
                        <br>
                        </br>
                        <div className="blogdetails">
                            <h1>{location.state.title}</h1>
                            <br>
                            </br>
                            <p>{location.state.description}</p>
                            <br>
                            </br>
                            <p>{ReactHTMLParser(location.state.body)}</p>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Blogs

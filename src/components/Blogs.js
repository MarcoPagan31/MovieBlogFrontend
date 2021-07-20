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
import { Link } from 'react-router-dom';

const Blogs = () => {
    const searchInput = useSelector(selectUserInput);
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const isSignedIn = useSelector(selectSignedIn)

    useEffect(() => {
        fetch("http://movieblogaws-env.eba-j2bkvnzm.us-east-2.elasticbeanstalk.com/api/v1/blog/getblogs")
            .then((response) => response.json())
            .then((data) => {
                dispatch(setBlogData(data));
                setBlogs(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);
    
    return (
        <div className="blog__page">
            <h1 className="blog__page__header"> Blogs </h1>
            {loading ? <h1 className="loading"> Loading...</h1>: ""}
            <div className="createblog">
                <Link to="/createblog">
                    <button 
                        className="logout__button"
                    >
                        Create a Blog
                    </button>
                </Link>
            </div>
            <div className='blogs'>
                {blogs?.filter((blog) => {
                    if (searchInput == "") {
                        return blog;
                    } else if (blog.title.toLowerCase().includes(searchInput.toLowerCase())){
                        return blog;
                    }
                }).map(blog => (
                    <a className="blog" target="_blank" href={blog.url}>
                        <div class="minus">
                            <img src={`data:image/gif;charset=utf-8;base64,${blog.content}`} />
                        </div>
                        
                        <div>
                            <h3 className="sourceName">
                                <span>
                                    {blog.title}
                                </span>
                                <p>
                                    {blog.publishedAt}
                                </p>
                            </h3>
                            <h1> 
                                <Link to={{ 
                                    pathname: '/blogdetails', 
                                    state: {
                                        title: blog.title,
                                        description: blog.description,
                                        body: blog.body,
                                        author: blog.author,
                                        comment: blog.comment
                                    }}}>
                                    {blog.title} 
                                </Link> 
                            </h1>
                            <p>{blog.description}</p>
                        </div>
                    </a>
                ))}

                {blogs?.totalArticles == 0 && 
                    <h1 className="no__blogs">
                        No blogs available. Search something else to read blogs on the greatest platform.
                    </h1>                
                }
            </div>
        </div>
    )
}

export default Blogs

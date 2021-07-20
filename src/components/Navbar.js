import { Avatar } from "@material-ui/core";
import React, { useState } from 'react'
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  setUserData,
} from "../features/UserSlice";
import "../styling/navbar.css";
import { BrowserRouter, Route, Link } from "react-router-dom";

const Navbar = () => {
    const [inputValue, setInputValue] = useState("")
    const isSignedIn = useSelector(selectSignedIn)
    const userData = useSelector(selectUserData);

    const dispatch = useDispatch()

    const logout = (response) => {
        dispatch(setSignedIn(false));
        dispatch(setUserData(null));
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setInput(inputValue));
    };

    return (
        <div className="navbar">
            <div className="navbar__header"> <Link> </Link>Movie Blog </div>
                {isSignedIn && (
                <div className="blog__search"> 
                    <input className="search" 
                        placeholder="Search for a blog" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className="submit" onClick={handleClick}>
                        Search
                    </button>
                </div>
                )}

                {isSignedIn ? (
                    <div className="navbar__user__data">
                       <Avatar src={userData?.imageUrl} alt={userData?.name}/>
                       <h1 className="signedIn"> {userData?.givenName} </h1>
                        <Link to="/homepage">
                            <button 
                                className="logout__button"
                            >
                                Blogs
                            </button>
                        </Link>
                        <Link to="/moviehome">
                            <button
                                className="logout__button"
                            >
                                Movies
                            </button>
                        </Link>
                        <Link to="/watchlist">
                            <button
                                className="logout__button"
                            >
                                Watchlist
                            </button>
                        </Link>
                        <Link to="/watched">
                            <button 
                                className="logout__button"
                            >
                                Watched
                            </button>
                        </Link>
                        
                       <GoogleLogout
                            clientId="57529085775-fk8rn8hren1q8o5ja2idq4m7hug5aong.apps.googleusercontent.com"
                            render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className="logout__button"
                            >
                                Logout
                            </button>
                            )}
                            buttonText="Logout"
                            onLogoutSuccess={logout}
                        />
                    </div>
                    ) : (
                        <h1 className="notSignedIn">User not available 😞</h1>
                    )}
        </div>
    )
}

export default Navbar;

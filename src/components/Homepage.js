import GoogleLogin from 'react-google-login';
import React from 'react';
import "../styling/home.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSignedIn, setSignedIn, setUserData } from "../features/UserSlice";
import Navbar from "./Navbar";
import Blogs from "./Blogs";

const Homepage = () => {
    const dispatch = useDispatch();

    const login = (response) => {
        dispatch(setSignedIn(true));
        dispatch(setUserData(response.profileObj));
    }

    const isSignedIn = useSelector(selectSignedIn)

    return (
        <div>
            <Navbar />
            <div className="home__page" style={{ display: isSignedIn ? "none" : "" }}>
              {!isSignedIn ? (
                <div className="login__message">
                    <h1>
                        Movie Blog
                    </h1>
                    <GoogleLogin
                        clientId="8777679767-bug9hehimqo5bndev01p1ipaa9lhbjaj.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className="login__button"
                            >
                                Login with Google
                            </button>
                        )}   
                        onSuccess={login}
                        onFailure={login}
                        isSignedIn={true}
                        cookiePolicy={"single_host_origin"}             
                    />
                </div> 
              ) : (
                  ""
              )}
              </div>
            {isSignedIn && <Blogs/>}
        </div>
        
    )
}

export default Homepage

import './App.css';

import React, { Component } from "react";
import { useState } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import axios from "axios";

const RegisterProfile = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const registerprofile = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
            }),
            
        };
        fetch("http://localhost:8080/api/v1/user-profile/", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
            })
    }

    return (
        <div class="login-page">
            <body>
                <form class="form" action="#" method="POST">
                  <h2> <id class="fas fa-bug"></id> Signup </h2>
                    <TextField onChange={(e) => setUsername(e.target.value)}> </TextField>
                    <br>
                    </br>
                    <TextField type="password"  onChange={(e) => setPassword(e.target.value)}> </TextField>
                    <br>
                    </br>
                    <TextField onChange={(e) => setEmail(e.target.value)}> </TextField>
                    <br>
                    </br>
                    <Button onClick={() => registerprofile()}> Sign Up</Button>
                </form>
            </body>
        </div>
    );
}

export default RegisterProfile;
import '../App.css';

import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Navbar from "./Navbar";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useLocation } from "react-router";
import { sizing } from '@material-ui/system';

const UpdateBlog = () => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [body, setBody] = useState();
    const [comment, setComment] = useState();
    const [author, setAuthor] = useState();
    const location = useLocation();

    const updateblog = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                oldTitle: location.state.title,
                description: description,
                body: body,
                author: author
            }),
            
        };
        fetch("api/v1/blog/updateblog", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
            })
    }

    const deleteblog = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: location.state.title,
                oldTitle: location.state.title,
                description: location.state.description,
                body: location.state.body,
                author: location.state.author
            }),
            
        };
        fetch("api/v1/blog/deleteblog", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              
            })
    }

    return (
        <div>
            <Navbar />
            <div className="left">
            <h1>
                Update Blog
            </h1>
            <br>
            </br>
                <label> Title </label>
                <br>
                </br>
                <TextField fullWidth="true" placeholder={location.state.title} size="small"  variant="outlined" class="box" onChange={(e) => setTitle(e.target.value)}/>
                <label> Description </label>
                <br>
                </br>
                <TextField fullWidth="true" placeholder={location.state.description} size="small"  variant="outlined" class="box" onChange={(e) => setDescription(e.target.value)}/>
                <label> Body </label>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={location.state.body}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setBody(data)
                        } }
                    />
        
                <br>
                </br>
                <label> Author </label>
                <TextField fullWidth="true" placeholder={location.state.author} size="small"  variant="outlined" class="box" type="text" onChange={(e) => setAuthor(e.target.value)}/>
                <br>
                </br>
                <Button onClick={() => updateblog()}> Update Blog </Button>
                <br>
                </br>
                <Button onClick={() => deleteblog()}> Delete Blog </Button>
            </div>
        </div>
    );
}

export default UpdateBlog;

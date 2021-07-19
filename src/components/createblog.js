import '../App.css';

import React, { Component } from "react";
import { useState } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Navbar from "../components/navbar";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";

const CreateBlog = () => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [body, setBody] = useState();
    const [comment, setComment] = useState();
    const [author, setAuthor] = useState();
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const formData = new FormData();
    const UPLOAD_IMAGE = "UPLOAD_IMAGE";
    
    const CreateBlog = () => async dispatch => {
        if (formData.entries().next().value[1] !== null) {
            const response = await axios.post("api/v1/blog/createblog", formData, {
                onUploadProgress:progressEvent => {
                    console.log("Uploading : " + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%")
                }
            });
            dispatch({
                type: UPLOAD_IMAGE,
                payload: response.data
            });
        }
    }

    const CreateBlogWithAdditionalData = () => {
        formData.append("title", title);
        formData.append("body", body);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("image", file);

        dispatch(CreateBlog(formData));
    }

    return (
        <div>
            <Navbar />
            <div className="left">
            <h1>
                Create a Blog
            </h1>
            <div class="container">
                    <body>
                    <label> Title </label>
                    <TextField fullWidth="true" size="small"  variant="outlined" class="box" onChange={(e) => setTitle(e.target.value)}/>
                    <br>
                    </br>
                    <label> Description </label>
                    <TextField fullWidth="true" size="small"  variant="outlined" class="box" onChange={(e) => setDescription(e.target.value)}/>
                    <br>
                    </br>
                    <label> Body </label>
                        <CKEditor
                            editor={ ClassicEditor }
                            data=""
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setBody(data)
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
            
                    <br>
                    </br>
                    <label> Blog Image </label>
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" />
                    <br>
                    </br>
                    <label> Author </label>
                    <TextField fullWidth="true" size="small"  variant="outlined" class="box" type="text" onChange={(e) => setAuthor(e.target.value)}/>
                    <br>
                    </br>
                    <button onClick={() => CreateBlogWithAdditionalData()}> Create New Blog </button>
                    </body>
            </div>
            </div>
        </div>
    );
}

export default CreateBlog;

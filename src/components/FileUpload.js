import React, {useState } from 'react';
import axios from 'axios';
import './FileUpload.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    
    const fileSelectedHandler = (event) =>{
        
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name);
    }

    const fileUploadHander = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        axios.post('/upload', formData)
        .then(
            res => {
                console.log(res);
            });
    }

    const saveFile = (event) =>{
        event.preventDefault();
        
    }

    return(
        <div className="holding">
            <div className="file-upload">
                <div className="custom-file">
                    <input 
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={fileSelectedHandler}
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                    {filename}
                    </label>
                </div>
            </div>

            <div className="">
                <button className="upload"  onClick={fileUploadHander}>
                    Upload
                </button>
            </div>

        </div>

    );
};

export default FileUpload;
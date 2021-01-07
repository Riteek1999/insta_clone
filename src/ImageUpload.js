import firebase from "firebase";
import React, {useState} from 'react'
import {Button} from "@material-ui/core";
import { storage,db } from "./firebase";
import './ImageUpload.css';
function ImageUpload ({username})     //the username passed in app.js is received here as destructured props
{

    const [caption, setCaption] = useState('');
    const [image , setImage] = useState(null);
    const [progress , setProgress] = useState(0);

    const handleChange = (e) => {
        if(e.target.files[0])    //if a file is selected from the target folder
        {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
             
        const uploadTask =  storage.ref(`images/${image.name}`).put(image);   //to post the image
        uploadTask.on(
            "state_changed",    //if there is any state change
            (snapshot) => {     //take a snapshot of progress while image is uploading
                    
                //progress function

                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes) * 100   //progress indicator between 0 to 100
                );
                setProgress(progress);
            } ,
            (error) => {
                //error function
                alert(error.message);
            } ,
             () => {
                //complete function
                storage
                       .ref("images")
                       .child(image.name)
                       .getDownloadURL()   //gives the url of image posted so that it can be pushed to db
                       .then( url => {
                           //post image inside db
                           db.collection("posts").add({
                               timestamp : firebase.firestore.FieldValue.serverTimestamp()  ,  //regardless of where we are it gives one unified time while upload
                               caption : caption,
                               imageUrl: url,
                               username : username
                           });

                               setProgress(0);
                               setCaption("");
                               setImage(null);

                       });

             }
        )
    }

    return (
        <div className="Imageupload">
            <progress className="imageupload_progress"  value={progress}  max="100"/>
            <input type="text" placeholder = "enter your text"  value = {caption} onChange={event=> setCaption(event.target.value)}  />
            <input type= "file"  onChange= {handleChange} />
            <Button className="Imageupload__button" onClick = {handleUpload}>Upload</Button>
        </div>
    )
    
}
export default ImageUpload
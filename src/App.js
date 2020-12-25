import './App.css';
import React, {useState , useEffect} from 'react';
import Post from './Post';
import { db, auth } from './firebase';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';


function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




function App() {
  const classes = useStyles();
  const [modalStyle]=useState(getModalStyle);
  const [posts, setPosts]= useState([]);
  const [open,setOpen]= useState(false);
  const [username,setUsername]= useState('');
  const [password,setPassword]= useState('');
  const [email,setEmail]= useState('');
  const [user,setUser]= useState(null);

      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if(authUser){
            //user has logged in
            console.log(authUser);
            setUser(authUser);
          }
          else{
            //user has logged out
            setUser(null);
          }
        })
        return()=>{
          //perform some cleanup action
          unsubscribe();
        }
      }, [user, username]);

      useEffect(() => {
        db.collection('posts').onSnapshot(snapshot =>{
                setPosts(snapshot.docs.map((doc)=>({id:doc.id, post : doc.data()})))
        })
      },[]);

      const signUp = (event) => {
        event.preventDefault();
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
          return authUser.user.displayNameupdateProfile({
            displayName: username,
          })
        })
        .catch((error) => alert(error.message));
      }

  // badly formatted data try to format in correct pattern like i did below
  return (
    <div className="App">

  <Modal
    open={open}
    onClose={()=>setOpen(false)}
  > 

  <div style={modalStyle} className={classes.paper}>
    <form className="app_signUp">
      <center>
        <img className="app_headerImage"
            src="../insta.png"
            alt=""
        />
      </center>
      {/* input is material ui component so its Input and not input */}
      <Input 
        placeholder="username"
        type="text"
        value={username}
        onChange={(e) =>setUsername(e.target.value)}
      />

      <Input 
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) =>setEmail(e.target.value)}
      />
      <Input   
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) =>setPassword(e.target.value)}
      />  

      <Button type="submit" onClick={signUp}>Signup</Button>
      {/* Event handlers are in camel case (onclick) wrong*/}
    </form>
  </div>

  </Modal>

      
      {/* {Header} */}
      <div className="app__header">
        <img className="app__headerImage" 
        src="../insta.png"
        alt= " "
        />
        
      </div>
       <Button onClick={()=>setOpen(true)}>Sign up</Button>
            { posts.map(({id,post})=>(
                <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
}
    </div>
  );
}

export default App;

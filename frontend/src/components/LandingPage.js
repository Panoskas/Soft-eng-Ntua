import { Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, {useState} from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import Header from "./Header"

function LandingPage(){

  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  const [loginShow, setLoginShow] = useState(false)
  const [loginUser, setLoginUser] = useState('')

  return(
    <div className="App">
      <LoginModal myShow={loginShow} user={loginUser} onClose={() => {setLoginShow(false)}}/>
      <Header/>
      <div className='App-body'>
          
          
          <b>Continue as</b>
          <div style={{width:"200px", height:"70px", borderBottom:"1px solid white", marginBottom:"20px"}}>
          <Button  style={{margin:'10px'}} variant='light' className='border-dark' onClick={() => {setLoginShow(true); setLoginUser('admin')}}>Admin</Button>
          </div>
          <Button  style={{margin:'10px'}} variant='light' className='border-dark' onClick={() => {setLoginShow(true); setLoginUser('toll')}}>Toll Company</Button>
          <Button  style={{margin:'10px'}} variant='light' className='border-dark' onClick={() => {setLoginShow(true); setLoginUser('ministry')}}>Ministry</Button>
          <Button  style={{margin:'10px'}} variant='light' className='border-dark' onClick={() => {setLoginShow(true); setLoginUser('bank')}}>Bank</Button>
        </div>
      
    </div>
    )
}

export default LandingPage;
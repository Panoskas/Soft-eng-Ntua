import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header"
import {getCookie} from "../Cookies"
import { Button } from 'react-bootstrap';
import axios from 'axios';

function Admin(){
    const navigate = useNavigate()

    const userCookie = getCookie('user')

    useEffect(()=>{
        if(userCookie !== 'admin'){
          navigate('/')
        }
      }
    )

    function healthcheck(){
      axios.get('/admin/healthcheck').then(response =>{
        let data = response
        console.log(response)
        alert('dbconnection: ' + response.data['dbconnection'] + '\nstatus: ' + response.data['status'])
      })
    }

    function resetStations(){
      axios.post('/admin/resetstations').then(response =>{
        let data = response
        console.log(response)
        alert('status: ' + response.data['status'])
      })
    }

    function resetVehicles(){
      axios.post('/admin/resetvehicles').then(response =>{
        let data = response
        console.log(response)
        alert('status: ' + response.data['status'])
      })
    }

    function resetPasses(){
      axios.post('/admin/resetpasses').then(response =>{
        let data = response
        console.log(response)
        alert('status: ' + response.data['status'])
      })
    }

    
    return(
    <div className="App">
      <Header/>
      <div className='App-body'>
          <b>Welcome your Majesty</b>
          <Button variant="light" className='border-dark' style={{fontSize:'18px', margin:'10px'}} onClick={() => {healthcheck()}}>HealthCheck</Button>
          <Button variant="light" className='border-dark' style={{fontSize:'18px', margin:'10px'}} onClick={() => {resetStations()}}>Reset Stations</Button>
          <Button variant="light" className='border-dark' style={{fontSize:'18px', margin:'10px'}} onClick={() => {resetVehicles()}}>Reset Vehicles</Button>
          <Button variant="light" className='border-dark' style={{fontSize:'18px', margin:'10px'}} onClick={() => {resetPasses()}}>Reset Passes</Button>
        </div>
      
    </div>
    )
}

export default Admin;
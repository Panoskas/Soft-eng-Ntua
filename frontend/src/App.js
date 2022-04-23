import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Button, Container, Row, Col } from 'react-bootstrap';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import TollCompany from './components/TollCompany'
import Bank from './components/Bank'
import Ministry from './components/Ministry'
import Admin from './components/Admin';

function App() {
  
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
            <Route exact path="/admin" element={<Admin/>}/>
            <Route exact path="/toll" element={<TollCompany/>}/>
            <Route exact path="/bank" element={<Bank/>}/>
            <Route exact path="/ministry" element={<Ministry/>}/>
        </Routes>
    </Router>
  );
}

export default App;
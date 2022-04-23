import { Container, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React from "react";
import { Link } from "react-router-dom";


function Header(){

return(

    <h1 className="App-header" style={{width:"100vw"}}>
        <Container>
        <Row>
            <Col></Col>
            <Col xs={6}><Link style={{textDecoration:'none', color:'inherit'}} to='/'><img src="../logo.png" className="App-logo" alt="" height={50} width={50} style={{marginBottom:'12px', marginLeft:'10px'}}/>ltrapass</Link></Col>
            <Col></Col>
        </Row>
        </Container>
    </h1>
    )
}

export default Header
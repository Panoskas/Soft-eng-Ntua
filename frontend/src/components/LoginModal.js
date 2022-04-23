import {FormControl, Modal, Form, ModalBody, ModalFooter, Button, Container, Row, Col} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import LandingPage from "./LandingPage";
import Header from "./Header"
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import axios from "axios";



function LoginModal ( {myShow, onClose, user} ){

    //const [toHome, setToHome] = useState(false)
    const navigate = useNavigate()
    //console.log(user)

    /*
    useEffect(() => {
        console.log('loading');
        console.log(toHome)
        if(toHome){
            history.push('/home')
        }
        // This is be executed when the state changes
    }, [toHome]);
    */


    
    function login(username, password, userIdentity){
        axios.post(
            '/login',  {username, password, userIdentity}).then(response =>{
            //console.log(response.data[0])
            if(response.data[0] === undefined){
                alert('wrong credentials')
            }
            else{
                if(userIdentity === 'admin'){
                    document.cookie = 'user = admin'
                    document.cookie = 'username = ' + username
                    navigate('/admin')
                }
                if(userIdentity === 'toll'){
                    document.cookie = 'user = toll'
                    document.cookie = 'username = ' + username
                    navigate('/toll')
                }
                if(userIdentity === 'ministry'){
                    document.cookie = 'user = ministry'
                    document.cookie = 'username = ' + username
                    navigate('/ministry')
                }
                if(userIdentity === 'bank'){
                    document.cookie = 'user = bank'
                    document.cookie = 'username = ' + username
                    navigate('/bank')
                }
            }
            
        })
    }
    



    class LoginForm extends React.Component{
        constructor(props) {
            super(props);
            this.state = { username: '', password: '' };

            this.handleChangeUsername = this.handleChangeUsername.bind(this);
            this.handleChangePassword = this.handleChangePassword.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleChangeUsername(event) {
            this.setState({username: event.target.value});
        }

        handleChangePassword(event) {
            this.setState({password: event.target.value});
        }

        handleSubmit(event) {
            login(this.state.username, this.state.password, user)        
            event.preventDefault();
        }


        render() {
            return (
                <Form onSubmit={this.handleSubmit}>
                    <ModalBody style={{backgroundColor: "#282c34"}}>
                        <FormControl required placeholder="username" value={this.state.username} onChange={this.handleChangeUsername} style={{marginBottom: "10px"}}/>
                        <FormControl required type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="password"/>
                    </ModalBody>
                    <ModalFooter style={{backgroundColor: "#282c34"}}>
                        <Button variant="light" type="submit" className="border-dark">Log in</Button>
                        <Button variant="danger" className="border-dark" onClick={onClose}>Close</Button>
                    </ModalFooter>
                </Form>
            );
        }
    }


    return (
        <Modal onHide={onClose} show={myShow} onEscapeKeyDown={onClose} style={{fontSize: "25px"}}>
            <ModalHeader style={{backgroundColor: "#282c34", color:"white"}}>
            <Container>
                <Row>
                    <Col></Col>
                    <Col style={{textAlign:"center"}} xs={6}><img src="../logo.png" alt="" height={30} width={30} style={{marginBottom:'8px', marginLeft:'10px'}}/>ltrapass</Col>
                    <Col></Col>
                </Row>
            </Container>
            </ModalHeader>
            <LoginForm/>
        </Modal>
    );

}

export default LoginModal;
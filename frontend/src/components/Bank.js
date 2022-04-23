import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header"
import { getCookie } from '../Cookies';
import { Col, Container, Row } from 'react-bootstrap';
import { Form, FormControl, Button, Table } from 'react-bootstrap';
import axios from 'axios';

function Bank(){
    const navigate = useNavigate()
    const [queryList, setQueryList] = useState('')
    const [queryFetched, setQueryFetched] = useState(false)

    const userCookie = getCookie('user')

    useEffect(()=>{
        if(userCookie !== 'bank'){
          navigate('/')
        }
      }
    )

    function chargesBy(opID, dateFrom, dateTo){
      dateFrom = dateFrom.replace('-', '')
      dateFrom = dateFrom.replace('-', '')
      dateTo = dateTo.replace('-', '')
      dateTo = dateTo.replace('-', '')
      console.log(dateTo)
      console.log(dateFrom)
      let url = '/chargesby/' + opID + '/' + dateFrom + '/' + dateTo
      axios.get(url).then(response =>{
        let data = response.data["PROList"]
        setQueryList(data)
        setQueryFetched(true)
        console.log(data)
      })
    }


    class ChargesByForm extends React.Component{
      constructor(props) {
          super(props);
          this.state = { opID: '', dateFrom: '', dateTo: ''};

          this.handleChangeOpID = this.handleChangeOpID.bind(this);
          this.handleChangeDateFrom = this.handleChangeDateFrom.bind(this);
          this.handleChangeDateTo = this.handleChangeDateTo.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChangeOpID(event) {
          this.setState({opID: event.target.value});
      }

      handleChangeDateFrom(event) {
          this.setState({dateFrom: event.target.value});
      }

      handleChangeDateTo(event) {
        this.setState({dateTo: event.target.value});
      }


      handleSubmit(event) {
          console.log(this.state.opID)
          console.log(this.state.dateFrom)
          console.log(this.state.dateTo)
          chargesBy(this.state.opID, this.state.dateFrom, this.state.dateTo)
          event.preventDefault();
      }


      render() {
          return (
              <Form onSubmit={this.handleSubmit}>
                <Container>
                    <Row>
                      <FormControl required placeholder="Operator ID" value={this.state.opID} onChange={this.handleChangeOpID} style={{margin: "10px", width:"150px"}}/>
                      <FormControl required placeholder="Date From" type="date" value={this.state.dateFrom} onChange={this.handleChangeDateFrom} style={{margin: "10px", width:"200px"}}/>
                      <FormControl required placeholder="Date From" type="date" value={this.state.dateTo} onChange={this.handleChangeDateTo} style={{margin: "10px", width:"200px"}}/>
                      <Button variant="light" type="submit" className="border-dark" style={{margin: "10px", width:"80px"}}>Search</Button>  
                    </Row>
                </Container>
              </Form>
          );
      }
    }

  
    return(
    <div className="App">
      <Header/>
      <div className='Bank-body'>
          <Container>
            <Row>
              <Col></Col>
              <Col xs={8}>
                <b>{getCookie('username').toUpperCase()} Frontend</b> 
                <br/>
                <ChargesByForm/>
                </Col>
              <Col></Col>
            </Row>
          </Container>
          <div style={{display:'inline-block', margin:'20px', fontSize:"20px"}}>{queryFetched == true &&
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Number of Passes</th>
                  <th>Passes Cost</th>
                  <th>Visiting Operator</th>
                </tr>
              </thead>
              <tbody>
                {queryList.map(queryItem =>
                  <tr>
                    <td>{queryItem["NumberOfPasses"]}</td>
                    <td>{queryItem["PassesCost"] != null && queryItem["PassesCost"].toFixed(2)}</td>
                    <td>{queryItem["VisitingOperator"]}</td>
                  </tr>)}
              </tbody>
            </Table>
          }</div>
      </div>
      
    </div>
    )
}

export default Bank;
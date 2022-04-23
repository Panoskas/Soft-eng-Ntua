import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header"
import { getCookie } from '../Cookies';
import axios from 'axios';
import { Form, FormControl, Row, Container, Button, Tabs, Tab, Table } from 'react-bootstrap';

function TollCompany(){
    const [key, setKey] = useState('Passes Per Station');

    const navigate = useNavigate()

    const [queryPassesCost, setQueryPassesCost] = useState('')
    const [queryPassesCostFetched, setQueryPassesCostFetched] = useState(false)

    const [queryList, setQueryList] = useState('')
    const [queryFetched, setQueryFetched] = useState(false)

    const [queryStation, setQueryStation] = useState('')
    const [queryStationFetched, setQueryStationFetched] = useState(false)

    const userCookie = getCookie('user')

    useEffect(()=>{
        if(userCookie !== 'toll'){
          navigate('/')
        }
      }
    )

  


    function passesPerStation(stationID, dateFrom, dateTo){
      dateFrom = dateFrom.replace('-', '')
      dateFrom = dateFrom.replace('-', '')
      dateTo = dateTo.replace('-', '')
      dateTo = dateTo.replace('-', '')
      console.log(dateTo)
      console.log(dateFrom)
      let url = '/passesperstation/' + stationID + '/' + dateFrom + '/' + dateTo
      axios.get(url).then(response =>{
        let data = response.data
        setQueryStation(data)
        setQueryStationFetched(true)
        console.log(data)
      })
    }

    class PassesPerStationForm extends React.Component{
      constructor(props) {
          super(props);
          this.state = { stationID: '', dateFrom: '', dateTo: ''};

          this.handleChangeStationID = this.handleChangeStationID.bind(this);
          this.handleChangeDateFrom = this.handleChangeDateFrom.bind(this);
          this.handleChangeDateTo = this.handleChangeDateTo.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChangeStationID(event) {
          this.setState({stationID: event.target.value});
      }

      
      handleChangeDateFrom(event) {
          this.setState({dateFrom: event.target.value});
      }

      handleChangeDateTo(event) {
        this.setState({dateTo: event.target.value});
      }


      handleSubmit(event) {
          console.log(this.state.stationID)
          console.log(this.state.dateFrom)
          console.log(this.state.dateTo)
          passesPerStation(this.state.stationID, this.state.dateFrom, this.state.dateTo)
          event.preventDefault();
      }


      render() {
          return (
              <Form onSubmit={this.handleSubmit}>
                <Container>
                    <Row style={{justifyContent:'center'}}>
                      <FormControl required placeholder="Station ID" value={this.state.stationID} onChange={this.handleChangeStationID} style={{margin: "10px", width:"150px"}}/>
                      <FormControl required placeholder="Date From" type="date" value={this.state.dateFrom} onChange={this.handleChangeDateFrom} style={{margin: "10px", width:"200px"}}/>
                      <FormControl required placeholder="Date From" type="date" value={this.state.dateTo} onChange={this.handleChangeDateTo} style={{margin: "10px", width:"200px"}}/>
                      <Button variant="light" type="submit" className="border-dark" style={{margin: "10px", width:"80px"}}>Search</Button>  
                    </Row>
                </Container>
              </Form>
          );
      }
    }


  
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
        chargesBy(getCookie('username'), this.state.dateFrom, this.state.dateTo)
        event.preventDefault();
    }


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
              <Container>
                  <Row style={{justifyContent:'center'}}>
                    <FormControl required placeholder="Date From" type="date" value={this.state.dateFrom} onChange={this.handleChangeDateFrom} style={{margin: "10px", width:"200px"}}/>
                    <FormControl required placeholder="Date From" type="date" value={this.state.dateTo} onChange={this.handleChangeDateTo} style={{margin: "10px", width:"200px"}}/>
                    <Button variant="light" type="submit" className="border-dark" style={{margin: "10px", width:"80px"}}>Search</Button>  
                  </Row>
              </Container>
            </Form>
        );
    }
  }


  function passesCost(opID, dateFrom, dateTo){
    dateFrom = dateFrom.replace('-', '')
    dateFrom = dateFrom.replace('-', '')
    dateTo = dateTo.replace('-', '')
    dateTo = dateTo.replace('-', '')
    console.log(dateTo)
    console.log(dateFrom)
    let url = '/passescost/' + getCookie('username') + '/' + opID + '/' +  dateFrom + '/' + dateTo
    console.log(url)
    axios.get(url).then(response =>{
      let data = response.data
      setQueryPassesCost(data)
      setQueryPassesCostFetched(true)
      console.log(data)
    })
  }


  class PassesCostForm extends React.Component{
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
        passesCost(this.state.opID, this.state.dateFrom, this.state.dateTo)
        event.preventDefault();
    }


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
              <Container>
                  <Row style={{justifyContent:'center'}}>
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
          <b>{getCookie('username').toUpperCase()} Company Frontend</b>
          <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 nav-tabs"
          style={{justifyContent:'center', fontSize:'20px', color:'black'}}>
      
            <Tab eventKey="Passes Per Station" title="Passes Per Station">
              <PassesPerStationForm/>
              <div style={{display:'inline-block', margin:'20px', fontSize:"18px"}}>{queryStationFetched == true &&
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Pass ID</th>
                      <th>Vehicle ID</th>
                      <th>Charge</th>
                      <th>Provider Abbr</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryStation["PassesList"].map(queryItem =>
                      <tr>
                        <td>{queryItem["PassID"]}</td>
                        <td>{queryItem["Vehicle_vehicleID"]}</td>
                        <td>{queryItem["charge"]}</td>
                        <td>{queryItem["providerAbbr"]}</td>
                        <td>{queryItem["timestamp"]}</td>
                      </tr>)}
                  </tbody>
                </Table>
              }</div>
            </Tab>

            <Tab eventKey="Charges By" title="Charges By">
            <ChargesByForm/>
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
            </Tab>

            <Tab eventKey="Passes Cost" title="Passes Cost">
            <PassesCostForm/>
              <div style={{display:'inline-block', margin:'20px', fontSize:"20px"}}>{queryPassesCostFetched == true &&
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Number of Passes</th>
                      <th>Passes Cost</th>
                      <th>Period From</th>
                      <th>Period To</th>
                      <th>Timestamp</th>
                      <th>opID</th>
                      <th>Foreign opID</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <td>{queryPassesCost["NumberOfPasses"]}</td>
                        <td>{queryPassesCost["PassesCost"] != null && queryPassesCost["PassesCost"].toFixed(2)}</td>
                        <td>{queryPassesCost["PeriodFrom"]}</td>
                        <td>{queryPassesCost["PeriodTo"]}</td>
                        <td>{queryPassesCost["RequestTimestamp"]}</td>
                        <td>{queryPassesCost["op_1ID"]}</td>
                        <td>{queryPassesCost["op_2ID"]}</td>
                      </tr>
                  </tbody>
                </Table>
              }</div>
            </Tab>
          </Tabs>
        </div>
      
    </div>
    )
}

export default TollCompany;
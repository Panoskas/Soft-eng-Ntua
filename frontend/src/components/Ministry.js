import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header"
import { getCookie } from '../Cookies';
import { Tabs, Tab, Button, Form, FormControl, Row, Container, Table } from 'react-bootstrap';
import axios from 'axios'

function Ministry(){
    
    const [key, setKey] = useState('Passes Analysis');

    const navigate = useNavigate()

    const [queryAnalysis, setQueryAnalysis] = useState('')
    const [queryAnalysisFetched, setQueryAnalysisFetched] = useState(false)

    const [queryStation, setQueryStation] = useState('')
    const [queryStationFetched, setQueryStationFetched] = useState(false)

    const userCookie = getCookie('user')

    useEffect(()=>{
        if(userCookie !== 'ministry'){
          navigate('/')
        }
      }
    )

    function passesAnalysis(opID1, opID2, dateFrom, dateTo){
      dateFrom = dateFrom.replace('-', '')
      dateFrom = dateFrom.replace('-', '')
      dateTo = dateTo.replace('-', '')
      dateTo = dateTo.replace('-', '')
      console.log(dateTo)
      console.log(dateFrom)
      let url = '/passesanalysis/' + opID1 + '/' + opID2 + '/' + dateFrom + '/' + dateTo
      axios.get(url).then(response =>{
        let data = response.data
        setQueryAnalysis(data)
        setQueryAnalysisFetched(true)
        console.log(data)
      })
    }

    class PassesAnylysisForm extends React.Component{
      constructor(props) {
          super(props);
          this.state = { opID1: '', opID2: '', dateFrom: '', dateTo: ''};

          this.handleChangeOpID1 = this.handleChangeOpID1.bind(this);
          this.handleChangeOpID2 = this.handleChangeOpID2.bind(this);
          this.handleChangeDateFrom = this.handleChangeDateFrom.bind(this);
          this.handleChangeDateTo = this.handleChangeDateTo.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChangeOpID1(event) {
          this.setState({opID1: event.target.value});
      }

      handleChangeOpID2(event) {
        this.setState({opID2: event.target.value});
    }

      handleChangeDateFrom(event) {
          this.setState({dateFrom: event.target.value});
      }

      handleChangeDateTo(event) {
        this.setState({dateTo: event.target.value});
      }


      handleSubmit(event) {
          console.log(this.state.opID1)
          console.log(this.state.opID2)
          console.log(this.state.dateFrom)
          console.log(this.state.dateTo)
          passesAnalysis(this.state.opID1, this.state.opID2, this.state.dateFrom, this.state.dateTo)
          event.preventDefault();
      }


      render() {
          return (
              <Form onSubmit={this.handleSubmit}>
                <Container>
                    <Row style={{justifyContent:'center'}}>
                      <FormControl required placeholder="Operator ID1" value={this.state.opID1} onChange={this.handleChangeOpID1} style={{margin: "10px", width:"150px"}}/>
                      <FormControl required placeholder="Operator ID2" value={this.state.opID2} onChange={this.handleChangeOpID2} style={{margin: "10px", width:"150px"}}/>
                      <FormControl required placeholder="Date From" type="date" value={this.state.dateFrom} onChange={this.handleChangeDateFrom} style={{margin: "10px", width:"200px"}}/>
                      <FormControl required placeholder="Date From" type="date" value={this.state.dateTo} onChange={this.handleChangeDateTo} style={{margin: "10px", width:"200px"}}/>
                      <Button variant="light" type="submit" className="border-dark" style={{margin: "10px", width:"80px"}}>Search</Button>  
                    </Row>
                </Container>
              </Form>
          );
      }
    }

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


    return(
    <div className="App">
      <Header/>
      <div className='Bank-body'>
          <b>{getCookie('username').toUpperCase()} Frontend</b>
          <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 nav-tabs"
          style={{justifyContent:'center', fontSize:'20px', color:'black'}}>
            <Tab eventKey="Passes Analysis" title="Passes Analysis">
              <PassesAnylysisForm/>
              <div style={{display:'inline-block', margin:'20px', fontSize:"18px"}}>{queryAnalysisFetched == true &&
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Charge</th>
                      <th>Pass ID</th>
                      <th>Station ID</th>
                      <th>Timestamp</th>
                      <th>Vehicle ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryAnalysis["PassesList"].map(queryItem =>
                      <tr>
                        <td>{queryItem["charge"]}</td>
                        <td>{queryItem["passID"]}</td>
                        <td>{queryItem["stationID"]}</td>
                        <td>{queryItem["timestamp"]}</td>
                        <td>{queryItem["vehicleID"]}</td>
                      </tr>)}
                  </tbody>
                </Table>
              }</div>
            </Tab>
      
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
          </Tabs>

      </div>
      
    </div>
    )
}

export default Ministry;
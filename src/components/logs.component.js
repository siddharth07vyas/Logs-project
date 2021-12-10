import Button from '@restart/ui/esm/Button';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { AddLog, GetLogs } from '../services/log.service';
function LogsComponent() {
  const [data, setData] = useState({
  startDate: moment().format('MM/DD/YYYY'),
  endDate: moment().format('MM/DD/YYYY'),
  description:''
  });

const [logs, setLogs] = useState([]);
const [isAdded, setIsAdded] = useState(false);

useEffect(() =>{
  GetLogs().then((response)=>{
    if(response.message === "success"){
      setLogs(response.data)
    }
  })
},[isAdded])
  const handleEvent = (event, picker) => {
    console.log(picker.startDate);
    setData(prevState => ({
      ...prevState,
      startDate: picker.startDate.format('MM/DD/YYYY'),
      endDate:picker.endDate.format('MM/DD/YYYY')
  }));
  }
  const handleInput = (event) =>{
    const {name, value} = event.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
  }));
  }

  const clearInput = () =>{
    setData(prevState => ({
      ...prevState,
      startDate: moment().format('MM/DD/YYYY'),
      endDate:moment().format('MM/DD/YYYY'),
      description:''
  }));
  }

  const handleSubmit = () =>{
    console.log(data);
    AddLog(data).then((response) =>{
      if(response.message === 'success'){
        setIsAdded(true);
        clearInput();
      }
    })
  }

  return (
    <Container>
  <Row>
    <Form>
      <Col>
      <Form.Group className="mb-3" >
        <Form.Label>Range</Form.Label>
        <DateRangePicker onEvent={handleEvent} initialSettings={ data.startDate, data.endDate }>
          <input type="text" className="form-control" />
        </DateRangePicker>
      </Form.Group>
    </Col>
    <Col>
      <Form.Group className="mb-3" >
      <Form.Label>Description</Form.Label>
      <Form.Control as="textarea" rows={3} name="description"
      value={data.description} onChange={handleInput} />
    </Form.Group>
    </Col>
      <Button variant="primary" type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>

    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Start Date</th>
      <th scope="col">End Date</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    {logs.map((data,index)=>(
      <tr key={index}>
        <td>{data.id}</td>
        <td>{data.startdate}</td>
        <td>{data.enddate}</td>
        <td>{data.description}</td>
        </tr>
    ))}
  </tbody>
</table>
  </Row>
</Container>
    
  );
}

export default LogsComponent;  
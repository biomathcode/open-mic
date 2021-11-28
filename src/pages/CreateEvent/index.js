import React, {useState}from 'react'
import { Button, Container, Form, Header, Icon, Message } from 'semantic-ui-react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { createEvent } from '../../hooks/firestoreutils';
import { useAuth } from '../../hooks/useAuth';
import Profile from '../Profile';
import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';


const options = [
    { key: 'a', text: 'Audio', value: 'audio' },
    { key: 'v', text: 'Video', value: 'video' },
  ]
  

const CreateEvent = () => {

  const navigate = useNavigate();

  const {user} = useAuth();
    const [name, setName] = useState();
    const [type, setType] = useState();
    const [description, setDescription] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [state, setState] = useState(false);

    const [message, setMessage] = useState('');


    

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = uuidv4();

    const url = document.location.origin

    const event_url = `${url}/${type}/${id}`
    if(user.uid && name && type && description && startDate){
      const newData = {
        event_name: name, 
        event_type: type, 
        event_description: description,
        event_date : String(startDate),
        event_url: event_url,
        invite_list : [],
        invite_send : false,
        invite_subject : "",
        invite_message : "",
        user_id : user.uid
      }
      console.log(newData)
      createEvent(newData);  
      console.log('Created event ')
      setMessage('Your Event is create you will be redirected to dashboard ')
      setState(true)
      setTimeout(() => {
        navigate('/dashboard')

      }, 2000)
    }

    if(name == null) {
      setMessage('Please give event a name')
    }

    if(type == null) {
      setMessage('Please select a type')
    }
    
    if (startDate == null) {
      setMessage('Please schedule a date for the event')
    }
    
    if(description == null) {
      setMessage('Please give a description about the event')
    }
    
  }  

  

  return (
    <Container>
      {
        !state? 
        <div>
        <Header as="h1" icon textAlign="center">
            <Icon color="olive" circular name="calendar alternate outline"/>
            <Header.Content>Create Event</Header.Content>
        </Header>
        <Button floated="left" onClick={() => navigate("/dashboard")}>
          <Icon name="backward" /> back
        </Button>
        <Profile/>
        <Form  onSubmit={handleSubmit}>
    <Form.Field >
      <label>Event Name</label>
      <input value={name} onChange={(e)=> setName(e.target.value)}  placeholder='Event Name' />
    </Form.Field>
    <Form.TextArea value={description} onChange={(e) => setDescription(e.target.value)} label='Description' placeholder='Tell us more about the event' />
    <Form.Select
        fluid
        value={type}
        onChange={(e, {value}) => {setType(value)}}
        label='Event Type'
        options={options}
        placeholder='Event Type'
          />
    <Form.Field>
        <label>Date and Time
        </label>
        <DatePicker 
        selected={startDate} 
        onChange={(date) => setStartDate(date)} 
        showTimeSelect
    timeFormat="HH:mm"
    timeIntervals={15}
    dateFormat="MMMM d, yyyy h:mm aa"
        />
    </Form.Field>
    
    <Button type='submit'>Submit</Button>
  </Form>

  {message &&
    <Message>{message}</Message>
  }
  </div>

        :
        <Message success> 🥳 Your event is created  </Message>
      }
      

    </Container>
    

  )
  
}
export default CreateEvent;
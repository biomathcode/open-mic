import React, { useState } from 'react'
import { Button, Container, Divider, Form, Header, Icon, Label, Message, Segment, TextArea } from 'semantic-ui-react';
import ReactTagInput from '@pathofdev/react-tag-input';
import "@pathofdev/react-tag-input/build/index.css";

import { useAuth } from '../../hooks/useAuth';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SendEmail({id,date, event_name,event_url, event_date }) {
    const {user} = useAuth();
    const [emails, setEmails] = useState(['pratik@coolhead.in']);
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [notify, setNotify] = useState('')

    const navigate = useNavigate()

    const sendInvite = async() => {
        if (message && subject && emails) {
            const response = await axios.post('/.netlify/functions/sendemail', {
                "inviteList": emails, 
                message, 
                subject,
                event_name,
                event_url,
                event_date
            })
            if(response.status === 200) {
                setNotify('your invite is successfully send to the invite list emails ')
            }else if(response.status !== 200) {
                setNotify('bad request please contact support time at pratik@coolhead.in')
            }
        }
        else {
            setNotify('Please fill the subject, message and the email list with correct details. ')
        }
        navigate('/dashboard')
    }
   


    return ( 
        <Container>
            <Header  as="h2" textAlign="center">
                Invite list for {event_name}
            </Header>
            
            <Divider/>
            <Header as="h3" textAlign="left">
                From {user.displayName}
            </Header>
            <Segment padded>
            <Form>
                <div style={{marginBottom: '25px', padding: '10px', border: "none"}}>
                <Label>To email ( write email and press enter) </Label>
                <ReactTagInput 
                
            tags={emails} 
            placeholder="Type and press enter"
            maxTags={50}
            onChange={(email) => setEmails(email)}
            />
            </div>
            <Form.Field >
                <Label>Subject</Label>
                <TextArea
                value={subject}
                rows={1}
                onChange={(e,{value}) => setSubject(value)}
                />
            
            </Form.Field>
            <Form.Field >
                <Label>Message</Label>
                <TextArea
                rows={7}
                value={message}
                onChange={(e,{value}) => setMessage(value)}
                />
            
            </Form.Field>

            <Button as="submit" color="blue" onClick={sendInvite}>
                Send invites
            </Button>
            </Form>
            </Segment>
            {
                notify &&
                <Message>{notify}</Message>
            }
           

        </Container>
     );
}




export default SendEmail;
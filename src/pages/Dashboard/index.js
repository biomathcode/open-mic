import React from 'react'
import { Container, Button} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import EventCard from '../../components/EventCard';
import Profile from '../Profile';
import { useAuth } from '../../hooks/useAuth';
import { ToastContainer } from 'react-toastify';

const Dashboard =() => {
    const {logout, user} = useAuth();
    console.log(user)
    return (
        <Container>

            <ToastContainer/>
            <Button onClick={logout}>Signout</Button>
            <h3>Welcome, {user && user.displayName} </h3>
            <Profile/>
            <Button floated='right' to="/createEvent" as={Link}>Create Event</Button>
            <EventCard/>
        </Container>
    )

}

export default Dashboard;
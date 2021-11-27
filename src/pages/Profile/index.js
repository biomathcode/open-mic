import React from 'react'

import {  Image, Header, Container } from 'semantic-ui-react';
import { useAuth } from '../../hooks/useAuth';


const Profile = () => {
    const {user} = useAuth();
    return(user &&
        <Container textAlign="left">
           <Header as='h2'>
            <Image circular src={user.photoURL} />
    {user.displayName}
  </Header>
        
        </Container>
            
    )
}

export default Profile;
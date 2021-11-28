import React from "react";

import { useAuth } from "../../hooks/useAuth";

import { Button, Message } from 'semantic-ui-react'
import { Link, Navigate} from 'react-router-dom';


function Signin() {
  const { signInWithGoogle,  isAuthenticating } = useAuth();

  return (
    !isAuthenticating ?
      (
        <div>
          <Button animated="fade" onClick={signInWithGoogle
          }>
            <Button.Content visible>          Login with Google
            </Button.Content>
            <Button.Content hidden>Let's Do This</Button.Content>
          </Button>
          {/* <button onClick={logout}>SignOut</button> */}
        </div>
      )
      : (
        <Navigate to="/dashboard"/> 
        ||
        <Message success>
        Redirecting you to the dashboard
        <Button floated="right" as={Link} to="/dashboard">Dashboard</Button>
      </Message>  


      )
      
      
      
      
      
  );
}
export default Signin;
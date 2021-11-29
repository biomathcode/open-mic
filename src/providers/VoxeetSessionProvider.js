import { useState, useEffect } from 'react';
import { initialize, session } from '@voxeet/voxeet-web-sdk';




const consumerKey = "x5UaeJT6LCkihwASgkP8FQ==" ;
const consumerSecret = "NrftZ88i2YDakaZbKGp24BQhSjLU7ED3NXx8Xnbxjw8=" ;

initialize(consumerKey, consumerSecret);

const name = 'Test User';

export const VoxeetSessionProvider = ({ children }) => {

  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  useEffect(() => {
    // how can I tell if a session is opened?
    session.open({ name }).then(() => {
      setIsSessionLoaded(true);
    });
  }, []);

  return isSessionLoaded ? children : <div>Loading session...</div>;
};

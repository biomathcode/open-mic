import "./App.scss";
import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from './pages/Home/index';
import Profile from "./pages/Profile/index";
import Video from './pages/VideoCall/index'
import { VoxeetSessionProvider } from './providers/VoxeetSessionProvider';
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";
import SendEmail from "./components/SendEmail";
import {useAuth } from "./hooks/useAuth";
import AudioCall from './pages/AudioCall'

import 'react-toastify/dist/ReactToastify.css';





function AuthRoute({children}){
  let { isAuthenticating} = useAuth();
  let location = useLocation();
  if(!isAuthenticating) {
    return <Navigate to="/" state={{from : location}} />
  }
  return children;

}

function App() {
  return (
    <div >

      <Router>
        <Routes>

          <Route  path="/" element={<Home/>} />
            <Route exact path="/profile" 
            element={
            <AuthRoute> 
              <Profile/>
            </AuthRoute>
            } />
            
            <Route exact path="/video/:id" element={
              <VoxeetSessionProvider>
            <Video/>

      </VoxeetSessionProvider>


           
            } />
            <Route exact path="/audio/:id" element={
              <AudioCall/>
            }
            />
            
            <Route exact path="/createEvent" element={
            <AuthRoute>
            <CreateEvent/>
            </AuthRoute>
          } />
            <Route exact path="/dashboard" element={
            <AuthRoute>
            <Dashboard/>
            </AuthRoute>} />
            <Route exact path="/sendinvite" element={
            <AuthRoute>
            <SendEmail/>
            </AuthRoute>
            } />
          
       
          
        </Routes>
      </Router>



    </div>
  );
}
export default App;
import React from 'react'
import { Container, Image, Header, Grid,Step, Icon } from 'semantic-ui-react'

import Signin from '../Signin'

import './home.scss'

import HomeSideImage from "../../asserts/HomeSideImage.jpeg";

import SecondPageLanding from '../../asserts/SecondPageLanding.jpeg';
import { ToastContainer } from "react-toastify";


const Home = () => {
    return (
        <div>
      <ToastContainer/>
            <div style={{ width: '100vw', height: "100vh", backgroundColor: 'rgb(232,87,94)' }}>
                <Container>
                    <Grid stackable columns={2} padded >
                        <Grid.Column textAlign="center" >
                            <Header as='h2' style={{ fontSize: '3em', paddingTop: '120px' }}>
                                Start your Show on Open Mic.
                            </Header>
                            <p style={{ fontSize: '1.5em' }}>
                                Audio and Video Streaming platform for artists.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <Signin />

                            </div>
                        </Grid.Column>
                        <Grid.Column >
                            <Image src={HomeSideImage} size="large" />

                        </Grid.Column>
                    </Grid>
                </Container>
            </div>

            <div style={{ width: '100wh', height: "100vh", backgroundColor: 'white' }}>
                <Container textAlign="center">


                    <Header style={{ fontSize: '5em', paddingTop: '30px' }}>Music is about Feeling.</Header>

                    <Image src={SecondPageLanding} />


                </Container>
            </div>
            <div style={{ width: '100wh', height: "100vh", }}>
                <Container  >

                    <Header style={{ fontSize: '5em', paddingTop: '30px' }}>
                        You are Four Steps way from starting a Virtual Show.
                    </Header>

                    <Step.Group >
                        <Step >
                            <Icon name='google' />
                            <Step.Content>
                                <Step.Title>Sign up</Step.Title>
                                <Step.Description>create an account</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step >
                            <Icon name='calendar' />
                            <Step.Content>
                                <Step.Title>Create an Event</Step.Title>
                                <Step.Description>Podcast, stand-up Comedy, live music show</Step.Description>
                            </Step.Content>
                        </Step>
                        <Step >
                            <Icon name='send' />
                            <Step.Content>
                                <Step.Title>Invite your audience</Step.Title>
                                <Step.Description>Send an official invite email.</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step >
                            <Icon name='video' />
                            <Step.Content>
                                <Step.Title>Start your show</Step.Title>
                            </Step.Content>
                        </Step>
                    </Step.Group>

                </Container>

            </div>

        </div>


    )
}

export default Home;
import React, {useState, useEffect} from 'react';
import { Container, Header, Image, Button, Progress, Feed, Card, GridRow, Grid } from 'semantic-ui-react';
import {getParticipantAudioLevel} from '../../utils/voxeetUtils'


function ProfileView({user,audioLevel, joined}) {
    return(
        <Container>
            <Grid padded>
            <Grid.Row >
            <Image circular src={user.photoURL} />
            <Header>{user.displayName}</Header>
            </Grid.Row>
            </Grid>
            
         <AudioBar audiolevel={audioLevel} />
        </Container>
    )
}

function AudioBar({audiolevel}) {
    let value = Math.round(audiolevel * 100)
    
    return (
        <Progress progress style={{width: '200px'}} indicating size="small" percent={value} />
    )
}

function ParticipantListView({participantList}) {

    console.log(participantList)


    return(
        <Feed>
            <h1> ParticipantList </h1>
            {
                participantList.map((user) => {
                    return (
                        <Feed.Event key={user.externalId}>
                            <Feed.Label>
                                <Image src={user.avatarUrl} />
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Summary>
                                    <Feed.User>{user.name}</Feed.User>
                                </Feed.Summary>
                               
                            </Feed.Content>
                        </Feed.Event>
                        
                    )
                })
            }

        </Feed>
        
    )
}


function AudioView({join,audioLevel,participantList,selfParticipant,handleAudioLevel, joined, leave, user}) {
    const AUDIO_CHECK_INTERVAL = 100
    useEffect(() => {
        if (joined) {
            const interval = setInterval(() => {
                getParticipantAudioLevel(selfParticipant,handleAudioLevel)
            }, AUDIO_CHECK_INTERVAL) 
     
            return () => {
                clearInterval(interval);
            }

        }
     }, [selfParticipant, handleAudioLevel, joined]);
    return ( 
        <Container >
            {!joined && <Button onClick={join}>Join</Button> }
            <ProfileView user={user} audioLevel={audioLevel} selfParticipant={selfParticipant} handleAudioLevel={handleAudioLevel}/>
        {joined &&
        <Container>
            <Button onClick={leave}>Leave</Button>   
        </Container>
}
        <ParticipantListView participantList={participantList} />
        </Container>
     );
}

export default AudioView;
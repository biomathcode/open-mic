import React, {useState, useEffect} from 'react';
import { Container, Header, Image, Button, Progress, Feed } from 'semantic-ui-react';
import {getParticipantAudioLevel} from '../../utils/voxeetUtils'


function ProfileView() {

    const user = {
        display_image: 'https://lh3.googleusercontent.com/a-/AOh14Gjnf7yh9y4idBUH3Wj9ID_yJG0yHaepal1ARLjfhA=s96-c',
        displayName: 'Pratik Sharma'
    }

    return(
        <Container>
            <Image src={user.display_image} />
            <Header>{user.displayName}</Header>
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

    const userList = [
        {
            display_image: 'https://lh3.googleusercontent.com/a-/AOh14Gjnf7yh9y4idBUH3Wj9ID_yJG0yHaepal1ARLjfhA=s96-c',
            displayName: 'Pratik Sharma',
            audioLevel: '0.2'
        },
        {
            display_image: 'https://lh3.googleusercontent.com/a-/AOh14Gjnf7yh9y4idBUH3Wj9ID_yJG0yHaepal1ARLjfhA=s96-c',
            displayName: 'chetan Sharma',
            audioLevel: '0.4'
        },
        {
            display_image: 'https://lh3.googleusercontent.com/a-/AOh14Gjnf7yh9y4idBUH3Wj9ID_yJG0yHaepal1ARLjfhA=s96-c',
            displayName: 'sunita Sharma',
            audioLevel: '0.67'
        }
            

    ]


    return(
        <Feed>
            {
                userList.map((user) => {
                    return (
                        <Feed.Event key={user.displayName}>
                            <Feed.Label>
                                <Image src={user.display_image} />
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Summary>
                                    <Feed.User>{user.displayName}</Feed.User>
                                </Feed.Summary>
                                <AudioBar audiolevel={user.audioLevel} />
                            </Feed.Content>
                        </Feed.Event>
                        
                    )
                })
            }

        </Feed>
        
    )
}


function AudioView({join,audioLevel,participantList,selfParticipant,handleAudioLevel, joined, leave}) {
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

    const [startView, setStartView] = useState(joined)
    
    return ( 
        <Container >
            {!joined && <Button onClick={join}>Join</Button> }
            <ProfileView/>
        <ParticipantListView participantList={participantList} />
        {joined &&
        <Container>
            <AudioBar audiolevel={audioLevel}/>
            <Button onClick={leave}>Leave</Button>   
        </Container>
}
        </Container>
     );
}

export default AudioView;
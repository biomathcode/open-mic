import React, {useEffect, useState, useCallback, useMemo} from 'react';

import { conference, session } from '@voxeet/voxeet-web-sdk';
import {
  createConference,
  joinConference,
  startAudio,
  stopAudio,
  
} from '../../utils/voxeetUtils';
import {  useNavigate, useParams } from 'react-router';
import AudioView from './AudioView';
import { useAuth } from '../../hooks/useAuth';
import { Container } from 'semantic-ui-react';
import SignInModel from './SignInModel';





function AudioCall() {
    const {id} = useParams()

    const [isSessionLoaded, setIsSessionLoaded] = useState(false);
    // const [cell, setCell] = useState(null) //cell is id 
    const [userId, setUserId] = useState(null)
    const [hostId, setHostId] = useState(null); //the host who created the event
    const [participantList, setParticipantList] = useState([ ])
    const [audioRoom, setAudioRoom] = useState(null)
    const [isUserAudioActive, setIsUserAudioActive] = useState(false);

    const [audioLevel, setAudioLevel] = useState(0);
    const [joined, setJoined] = useState(false)

    const {user} = useAuth()

    const navigate = useNavigate()

    const handleAudioLevel = useCallback((audio) => {
        setAudioLevel(audio);
    }, [audioLevel])

    const selfParticipant = useMemo(() => {
        return participantList.find((p) => p.isYou);
    }, [participantList]);

    //event handlers
    const handleAudioRoomUpdate = useCallback(({newData}) => {
        setAudioRoom(newData)
    }, []);

    const handleAudioActiveUpdate = useCallback((isActive) => {
        setIsUserAudioActive(isActive);
    })

    const streamUpdatedCallback = useCallback(
        (participant, stream) => {
            const thisParticipentIndex = participantList.findIndex((el) => {
                return el.id === participant.id;
            })

            console.log(participant.info)

            //if not in the list, add
            if (thisParticipentIndex === -1) {
                let isYou;
                if(session.participant.id === participant.id) {
                    isYou = true;
                } else {
                    isYou = false;
                }
                //create object with name and ID
                const newDetails = {
                    name: participant.info.name,
                    avatarUrl: participant.info.avatarUrl,
                    id: participant.id,
                    participant: participant.streams,
                    isAudio: true,
                    isYou: isYou,
                    isInactive: false,
                };

            const newParticipantList = [...participantList,newDetails];
            setParticipantList(newParticipantList);
            }
        }
    )

    useEffect(() => {
      // how can I tell if a session is opened?
      if(user) {
        session.open(  {
            externalId: user.uid,
            name: user.displayName,
            avatarUrl: user.photoURL,
        }).then(() => {
          setIsSessionLoaded(true);
        });

      }
      
    }, [id,user]);

    useEffect(() => {
        if (isUserAudioActive) {
            try {
                startAudio();
            } catch {}
        } else {
            try {
                stopAudio();
            } catch {}
        }
    }, [isUserAudioActive]);



    const join = ()=> {
        createConference(id)
            .then((conf) => {
                return joinConference(conf);
            })
            .then((newAudioRoom) => {
                const newUserId = session.participant.id;
                console.log(newUserId)
                
                setUserId(newUserId);
                setAudioRoom(newAudioRoom);
                setJoined(true)
                // subscribeToClassRoomUpdates({
                //     id,
                //     callback: handleClassRoomUpdate
                // })
            })   
    }

    const leaveConference = () => {
        conference.leave();
        setJoined(false);
        navigate('/dashboard');
    }

    useEffect(() => {
        conference.on('streamAdded', streamUpdatedCallback)
        conference.on('streamUpdated', streamUpdatedCallback)

        return () => {
            conference.on('streamAdded', streamUpdatedCallback)
            conference.on('streamUpdated', streamUpdatedCallback)
        }
    }, [
        participantList,
        streamUpdatedCallback
    ])

    if(!user) {
        return (
            <Container>
                <SignInModel/>
            </Container>
        )
    }

  
    return isSessionLoaded ? 
    (
        <div>
            <AudioView
            joined={joined} 
            join={join} 
            leave={leaveConference}
            hostId={hostId}
            audioLevel={audioLevel}
            handleAudioLevel={handleAudioLevel}
            selfParticipant={selfParticipant}
            participantList={participantList}
            audioRoom={audioRoom}
            isUserAudioActive={isUserAudioActive}
            handleAudioActiveUpdate={handleAudioActiveUpdate}
            user={user}
            />

        </div>
    )
    : <div>Loading session...</div>;

    
}

export default AudioCall;
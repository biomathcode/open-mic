import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Item, Container, Label, Message, Header, Icon, Modal } from 'semantic-ui-react'
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../hooks/useAuth';

import { deleteEvent } from '../../hooks/firestoreutils'
import SendEmail from '../SendEmail';


const copyToClipboard = (msg) => {
    navigator.clipboard.writeText(msg)
}

function EventItem() {
    const { user } =  useAuth();

    const [data, setData] = useState([]);

    const [openSend, setOpenSend] = useState(false);
    
    const deletingEvent = (id) => {
        deleteEvent(id)
        setData(data => data.filter(event => event.id !== id));
        console.log('deleted event with id', id);
    }    

    useEffect(() => {
        async function query() {
            if ( user && user.uid) {
                const snapshots = await db.collection('events')
                    .where('user_id', '==', user.uid).get();
    
                const list = []
                const response = snapshots.docs.map((doc) => {
                    let id = doc.id;
                    let alldata = doc.data();
                    const newData = {
                        id: id,
                        ...alldata
                    }
                    return list.push(newData)
                })
                
                if(response) {
                    setData(list)
                }
                return data  ; 
    
            }
        }
        query();
    // eslint-disable-next-line
    },[])

    return (
        data &&
        <div>
            <Container >
                <Header  floated='left'>
                    Your events
                </Header>
                <Container>
                
                

                <Item.Group>
                    {data && 
                        data.map((event) => {
                            return (
            
                                <Item key={event.id}
                                
                                >
                                    
                                    <Item.Content >
                                        <Item.Header icon >
                                            {event?.event_name}
                                            <Button icon labelPosition="left" floated="right" size="small" onClick={() => deletingEvent(event.id)}>
                                              <Icon name="delete"/>   delete 
                                            </Button>
                                        </Item.Header>
                                        <Item.Meta>{event?.event_date}</Item.Meta>
                                        <Item.Description>{event?.event_description}</Item.Description>
                                       
                                        <Button as="a" onClick={() => window.open(event.event_url)}>
                                            Go to Event
                                        </Button>
                                        <h3>Invite list </h3>
                                        <ul>
                                            {event.invite_list && event.invite_list?.map((email) => {
                                                return <Label key={email}>{email}</Label>
                                            })}
                                        </ul>
                                        {
                                            event.invite_send ?

                                                <Message>you have already send an invite</Message>
                                                :
                                                (
                                                    // <Link to="/sendInvite">
                                                    //     <Button>
                                                    //         Send invite
                                                    //     </Button>
                                                    // </Link>
                                                    <Modal
                                                    onClose={() => setOpenSend(false)}
                                                    onOpen={() => setOpenSend(true)}
                                                    open={openSend}
                                                    trigger={<Button>Send Invite</Button>}
                                                    >   
                                                    <SendEmail
                                                    event_name={event.event_name}
                                                    event_date={event.event_date}
                                                    event_url={event.event_url}
                                                    />
                                                    </Modal>
                                                )

                                        }
                                        {event.event_url && 
                                        <Item.Extra>
                                            <Button floated="right" as="a" onClick={copyToClipboard(event.event_url)}>Copy link </Button>
                                        </Item.Extra>

                                        }
                                    </Item.Content>
                                   
                                </Item>
                            )
                        })
                    }
                </Item.Group>
                </Container>
            </Container>
        </div>
    );
}

export default EventItem;
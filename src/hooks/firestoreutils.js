import { db } from "./useAuth"


const getAllEvents = (user_id) => {
    return db.collection('events').where("user_id", '==', user_id).get()
}

const createEvent = (data) => {
    return db.collection('events').add(data)
} 

const deleteEvent = (id) => {
    return db.collection('events').doc(id).delete();
}


export {getAllEvents, createEvent, deleteEvent}

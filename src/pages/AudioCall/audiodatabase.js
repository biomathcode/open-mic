import { db } from "../../providers/Firebase";

// create an audioroom
// with an id
// let all people join with the
// 

export const getFirebaseDataOnce = async({cell}) => {
    const ref = db.ref(cell);
    return  (await ref.get()).val();
}



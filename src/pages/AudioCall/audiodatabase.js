import { db } from "../../providers/Firebase";

export const getFirebaseDataOnce = async({cell}) => {
    const ref = db.ref(cell);
    return  (await ref.get()).val();
}



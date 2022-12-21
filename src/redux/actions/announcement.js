import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore"
import { CURRENT_USER_GET_ANNOUNCEMENTS } from "../constants";

require("firebase/auth");

export const createAnnouncement = (announcement, creator) => dispatch => new Promise((resolve, reject) => {
    addDoc(collection(getFirestore(), "organizations/" + creator.org + "/chapters/" + creator.chapter + "/announcements"), {
        announcement,
        creator
    })
    .then(() => {
        resolve()
    })
    .catch((error) => {
        console.log(error);
        reject()
    })
})

export const getUserAnnouncements = (creator) => dispatch => new Promise((resolve, reject) => {
    getDocs(collection(getFirestore(),"organizations/" + creator.org + "/chapters/" + creator.chapter + "/announcements"))
    .then((docs) => {
        var announcements = []
        docs.forEach((doc) => {
            const data = doc.data()
            const id = doc.id
            return { id, ...data }
        })
        dispatch({ type: CURRENT_USER_GET_ANNOUNCEMENTS, currentUserAnnouncements: announcements })
    })
    .catch((error) => {
        reject(error)
    })
})
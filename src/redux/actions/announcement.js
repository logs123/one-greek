import { addDoc, collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore"

require("firebase/auth");

export const createAnnouncement = (title, body, creator) => dispatch => new Promise((resolve, reject) => {
    addDoc(collection(getFirestore(), "organizations/" + creator.org + "/chapters/" + creator.chapter + "/announcements"), {
        title,
        body,
        creator,
        date: new Date()
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
    getDocs(query(collection(getFirestore(),"organizations/" + creator.org + "/chapters/" + creator.chapter + "/announcements"), orderBy("date","desc")))
    .then((docs) => {
        const announcements = []
        docs.forEach((doc) => {
            const data = doc.data()
            const id = doc.id
            announcements.push({id, ...data})
        })
        resolve(announcements);
    })
    .catch((error) => {
        reject(error)
    })
})
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query } from "firebase/firestore"
import { CURRENT_USER_GET_ANNOUNCEMENTS } from "../constants";

require("firebase/auth");

export const createAnnouncement = (title, body, creator) => dispatch => new Promise((resolve, reject) => {
    addDoc(collection(getFirestore(), "organizations/" + creator.org + "/chapters/" + creator.chapter + "/announcements"), {
        title,
        body,
        creator,
        date: new Date(),
        likes: 0,
        likedBy: []
    })
    .then(() => {
        resolve();
    })
    .catch((error) => {
        console.log(error);;
        reject();
    });
});

export const getUserAnnouncements = (org, chapter) => dispatch => new Promise((resolve, reject) => {
    getDocs(query(collection(getFirestore(),"organizations/" + org + "/chapters/" + chapter + "/announcements"), orderBy("date","desc")))
    .then((docs) => {
        const announcements = [];
        docs.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            announcements.push({id, ...data});
        })
        dispatch({ type: CURRENT_USER_GET_ANNOUNCEMENTS, currentUserAnnouncements: announcements});
    })
    .catch((error) => {
        reject(error);
    })
});

export const deleteAnnouncement = (org, chapter, id) => dispatch => new Promise((resolve, reject) => {
    deleteDoc(doc(getFirestore(), "organizations/" + org + "/chapters/" + chapter + "/announcements", id))
    .then(() => {
        resolve();
    })
    .catch((error) => {
        reject(error);
    });
});
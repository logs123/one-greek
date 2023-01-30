import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, updateDoc } from "firebase/firestore"
import { CURRENT_USER_GET_ANNOUNCEMENTS } from "../constants";

require("firebase/auth");

export const createAnnouncement = (title, body, creator, uid) => dispatch => new Promise((resolve, reject) => {
    addDoc(collection(getFirestore(), "organizations/" + creator.org + "/chapters/" + creator.chapter + "/announcements"), {
        title,
        body,
        creator,
        uid,
        date: new Date(),
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

export const like = (org, chapter, id, likedBy) => dispatch => new Promise((resolve, reject) => {
    updateDoc(doc(getFirestore(), "organizations/" + org + "/chapters/" + chapter + "/announcements", id), {
        likedBy: likedBy
    })
    .then(() => {
        resolve();
    })
    .catch((error) => {
        reject(error);
    })
});

export const unlike = (org, chapter, id, likedBy) => dispatch => new Promise((resolve, reject) => {
    updateDoc(doc(getFirestore(), "organizations/" + org + "/chapters/" + chapter + "/announcements", id), {
        likedBy: likedBy
    })
    .then(() => {
        resolve();
    })
    .catch((error) => {
        reject(error);
    })
});
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, updateDoc } from "firebase/firestore"
import { CREATE_ANNOUNCEMENT, CURRENT_USER_GET_ANNOUNCEMENTS, DELETE_ANNOUNCEMENT, LIKE_ANNOUNCEMENT, UNLIKE_ANNOUNCEMENT } from "../constants";

require("firebase/auth");

export const createAnnouncement = (title, body, creator, uid, date, likedBy, announcements) => dispatch => new Promise((resolve, reject) => {
    addDoc(collection(getFirestore(), "organizations/" + creator.org + "/chapters/" + creator.chapter + "/announcements"), {
        title,
        body,
        creator,
        uid,
        date,
        likedBy
    })
    .then((doc) => {
        if (announcements.length > 0) {
            announcements.unshift({ body, creator, date, id: doc.id, likedBy, title, uid })
        } else {
            announcements.push({ body, creator, date, id: doc.id, likedBy, title, uid })
        }
        return dispatch({
            type: CREATE_ANNOUNCEMENT,
            currentUserAnnouncements: announcements
        })
    })
    .catch((error) => {
        reject(error);
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

export const deleteAnnouncement = (org, chapter, id, announcements) => dispatch => new Promise((resolve, reject) => {
    deleteDoc(doc(getFirestore(), "organizations/" + org + "/chapters/" + chapter + "/announcements", id))
    .then(() => {
        return dispatch({
            type: DELETE_ANNOUNCEMENT,
            currentUserAnnouncements: announcements
        })
    })
    .catch((error) => {
        reject(error);
    });
});

export const like = (org, chapter, id, likedBy, announcements) => dispatch => new Promise((resolve, reject) => {
    updateDoc(doc(getFirestore(), "organizations/" + org + "/chapters/" + chapter + "/announcements", id), {
        likedBy: likedBy
    })
    .then(() => {
        return dispatch({
            type: LIKE_ANNOUNCEMENT,
            currentUserAnnouncements: announcements
        })
    })
    .catch((error) => {
        reject(error);
    })
});

export const unlike = (org, chapter, id, likedBy, announcements) => dispatch => new Promise((resolve, reject) => {
    updateDoc(doc(getFirestore(), "organizations/" + org + "/chapters/" + chapter + "/announcements", id), {
        likedBy: likedBy
    })
    .then(() => {
        return dispatch({
            type: UNLIKE_ANNOUNCEMENT,
            currentUserAnnouncements: announcements
        })
    })
    .catch((error) => {
        reject(error);
    })
});
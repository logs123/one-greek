import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, updateDoc } from "firebase/firestore"
import { CREATE_ANNOUNCEMENT, CURRENT_USER_GET_ANNOUNCEMENTS, DELETE_ANNOUNCEMENT, LIKE_ANNOUNCEMENT, UNLIKE_ANNOUNCEMENT } from "../constants";

require("firebase/auth");

export const createAnnouncement = (title, body, creator, uid, date, likedBy, announcements) => {
    return async (dispatch) => {
        try {
            await addDoc(collection(getFirestore(), "organizations/" + creator.org + "/chapters/" + creator.chapter + "/announcements"), {
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
                dispatch({ type: CREATE_ANNOUNCEMENT, currentUserAnnouncements: announcements })
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getUserAnnouncements = (org, chapter) => {
    return async (dispatch) => {
        try {
            await getDocs(query(collection(getFirestore(),"organizations/" + org + "/chapters/" + chapter + "/announcements"), orderBy("date","desc")))
            .then((docs) => {
                const announcements = [];
                docs.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    announcements.push({id, ...data});
                })
                dispatch({ type: CURRENT_USER_GET_ANNOUNCEMENTS, currentUserAnnouncements: announcements});
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteAnnouncement = (org, chapter, id, announcements) => {
    return async (dispatch) => {
        try {
            await deleteDoc(doc(getFirestore(), "organizations/" + org + "/chapters/" + chapter + "/announcements", id))
            .then(() => {
                dispatch({ type: DELETE_ANNOUNCEMENT, currentUserAnnouncements: announcements })
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const like = (org, chapter, id, likedBy, announcements) => {
    return async (dispatch) => {
        try {
            await updateDoc(doc(getFirestore(), "organizations/" + org + "/chapters/" + chapter + "/announcements", id), {
                likedBy: likedBy
            })
            .then(() => {
                dispatch({ type: LIKE_ANNOUNCEMENT, currentUserAnnouncements: announcements })
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const unlike = (org, chapter, id, likedBy, announcements) => {
    return async (dispatch) => {
        try {
            await updateDoc(doc(getFirestore(), "organizations/" + org + "/chapters/" + chapter + "/announcements", id), {
                likedBy: likedBy
            })
            .then(() => {
                dispatch({ type: UNLIKE_ANNOUNCEMENT, currentUserAnnouncements: announcements })
            })
        } catch (error) {
            console.log(error);
        }
    }
}
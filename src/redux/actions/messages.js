import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { CREATE_MESSAGE, GET_MESSAGE_PREVIEWS, GET_USER_MESSAGES } from "../constants";

require("firebase/auth");

export const createMessage = (selectedUsers, type) => dispatch => new Promise((resolve, reject) => {
    addDoc(collection(getFirestore(), "messages"), {
        type: type === true ? "group" : "individual",
        title: "New Chat",
        members: [getAuth().currentUser.uid, ...selectedUsers]
    })
    .then((message) => {
        return dispatch({
            type: CREATE_MESSAGE,
            chatID: message.id
        })
    })
    .catch((error) => {
        reject(error);
    });
})

export const getUserMessages = () => dispatch => new Promise((resolve, reject) => {
    getDocs(query(collection(getFirestore(), "messages"), where("members", "array-contains", getAuth().currentUser.uid)))
    .then((docs) => {
        const messages = [];
        docs.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            messages.push({id, ...data});
        })
        dispatch({ type: GET_USER_MESSAGES, messages: messages});
    })
    .catch((error) => {
        reject(error);
    })
})

export const getMessagePreviews = () => dispatch => new Promise((resolve, reject) => {
    getDocs(query(collection(getFirestore(),"messages"), where("members", "array-contains", getAuth().currentUser.uid)))
    .then((docs) => {
        const list = [];
        docs.forEach((ds) => {
            const preview = {id: ds.id, ...ds.data()};
            if (ds.data().type === "individual") {
                const otherPersonID = ds.data().members.find((memberId) => memberId !== getAuth().currentUser.uid);
                getDoc(doc(getFirestore(), "users", otherPersonID))
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        preview.title = `${docSnap.data().firstName} ${docSnap.data().lastName}`;
                    }
                })
            }
            list.push(preview)
        });
        return dispatch({
            type: GET_MESSAGE_PREVIEWS,
            previews: list
        });
    })
    .catch((error) => {
        reject(error)
    });
})
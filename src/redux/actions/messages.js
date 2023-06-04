import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { CREATE_MESSAGE, GET_MESSAGE_PREVIEWS, GET_USER_MESSAGES } from "../constants";

require("firebase/auth");

export const createMessage = (selectedUsers, type) => {
    return async (dispatch) => {
        try {
            await addDoc(collection(getFirestore(), "messages"), {
                type: type === true ? "group" : "individual",
                title: type === true ? "Group" : await getDoc(doc(getFirestore(), "users", selectedUsers[0]))
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        return `${docSnap.data().firstName} ${docSnap.data().lastName}`;
                    }
                }),
                members: [getAuth().currentUser.uid, ...selectedUsers],
                messages: []
            })
            .then((message) => {
                dispatch({ type: CREATE_MESSAGE, chatID: message.id })
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getUserMessages = (chatID) => {
    return async (dispatch) => {
        try {
            await getDoc(doc(getFirestore(), "messages", chatID))
            .then((docs) => {
                const messages = [];
                docs.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    messages.push({id, ...data});
                })
                dispatch({ type: GET_USER_MESSAGES, messages: messages});
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getMessagePreviews = () => {
    return async (dispatch) => {
        try {
            await getDocs(query(collection(getFirestore(),"messages"), where("members", "array-contains", getAuth().currentUser.uid)))
            .then((docs) => {
                const list = [];
                docs.forEach((ds) => {
                    list.push({id: ds.id, ...ds.data()})
                });
                dispatch({ type: GET_MESSAGE_PREVIEWS, previews: list });
            })
        } catch (error) {
            console.log(error)
        }
    }
}
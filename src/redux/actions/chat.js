import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { CREATE_MESSAGE, GET_MESSAGE_PREVIEWS, GET_USER_MESSAGES } from "../constants";

require("firebase/auth");

export const createChat = (title, members, isGroupChat) => {
    return async (dispatch) => {
        try {
            const name = "";
            await addDoc(collection(getFirestore(), "chats"), {
                title: isGroupChat ? title : await getDoc(doc(getFirestore(), "users", members[1]))
                .then((docSnap) => {
                    name = `${docSnap.data().firstName} ${docSnap.data().lastName}`;
                    return `${docSnap.data().firstName} ${docSnap.data().lastName}`;
                }),
                members,
                messages: [],
                isGroupChat
            })
            .then((chat) => {
                dispatch({ type: CREATE_MESSAGE, chatID: chat.id, title: isGroupChat ? title : name, members, isGroupChat })
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getUserMessages = (chatID) => {
    return async (dispatch) => {
        try {
            await getDoc(doc(getFirestore(), "chats", chatID))
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

export const getChatPreviews = () => {
    return async (dispatch) => {
        try {
            await getDocs(query(collection(getFirestore(),"chats"), where("members", "array-contains", getAuth().currentUser.uid)))
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
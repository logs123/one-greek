import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { DENY, UNVERIFIED_LIST_LOAD, VERIFY } from "../constants";

require("firebase/auth");

export const getUnverified = (org, chapter) => dispatch => new Promise((resolve, reject) => {
    getDocs(collection(getFirestore(),"organizations/" + org + "/chapters/" + chapter + "/unverified"))
    .then((docs) => {
        const list = [];
        docs.forEach((doc) => {
            list.push({id: doc.id, data: doc.data()})
        });
        return dispatch({
            type: UNVERIFIED_LIST_LOAD,
            unverified: list
        });
    })
    .catch((error) => {
        reject(error)
    });
});

export const verify = (uid, list) => dispatch => new Promise((resolve, reject) => {
    getDoc(doc(getFirestore(), "users", uid))
    .then((docSnap) => {
        if (docSnap.exists()) {
            const firstName = docSnap.data().firstName
            const lastName = docSnap.data().lastName
            setDoc(doc(getFirestore(), `organizations/${docSnap.data().org}/chapters/${docSnap.data().chapter}/members`, uid), {
                firstName,
                lastName
            })
            .then(() => {
                deleteDoc(doc(getFirestore(), `organizations/${docSnap.data().org}/chapters/${docSnap.data().chapter}/unverified`, uid))
                .then(() => {
                    updateDoc(doc(getFirestore(), "users", uid), {
                        verified: true
                    });
                    return dispatch({
                        type: VERIFY,
                        unverified: list
                    });
                })
            })
        }
    })
    .catch((error) => {
        reject(error);
    });
});

export const deny = (list) => ({
    type: DENY,
    unverified: list
});
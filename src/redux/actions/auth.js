import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"; 
import { USER_STATE_CHANGE } from "../constants";

require("firebase/auth");

export const userAuthStateListener = () => dispatch => {
    onAuthStateChanged(getAuth(), (user) => {
        if (user) {
            dispatch(getCurrentUserData());
        } else {
            dispatch({ type: USER_STATE_CHANGE, currentUser: null, userID: null, loaded: true });
        }
    })
}

export const getCurrentUserData = () => dispatch => {
    getDoc(doc(getFirestore(), "users", getAuth().currentUser.uid))
    .then((docSnap) => {
        if (docSnap.exists()) {
            return dispatch({
                type: USER_STATE_CHANGE,
                currentUser: docSnap.data(),
                userID: getAuth().currentUser.uid,
                loaded: true
            })
        }
    });
}

export const login = (auth, email, password) => dispatch => new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        resolve();
    })
    .catch((error) => {
        reject(error);
    });
});

export const logout = () => dispatch => new Promise((resolve, reject) => {
    signOut(getAuth())
    .then(() => {
        resolve();
    })
    .catch((error) => {
        reject(error);
    });
});

export const register = (auth, email, password, org, firstName, lastName, phoneNumber, type) => dispatch => new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        setDoc(doc(getFirestore(), "users", getAuth().currentUser.uid), {
            org,
            firstName,
            lastName,
            phoneNumber,
            email,
            type,
            chapter: null,
            verified: false
        });
        resolve();
    })
    .catch((error) => {
        reject(error);
    });
});

export const forgotPassword = (auth, email) => dispatch => new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
        resolve();
    })
    .catch((error) => {
        reject(error);
    });
});
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"; 
import { USER_STATE_CHANGE } from "../constants";

require("firebase/auth");

export const userAuthStateListener = () => dispatch => {
    onAuthStateChanged(getAuth(), (user) => {
        if (user) {
            dispatch(getCurrentUserData())
        } else {
            dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true })
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
                loaded: true
            })
        } else {

        }
    })
}

export const login = (auth, email, password) => dispatch => new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        resolve()
    })
    .catch((error) => {
        reject(error)
    })
})

export const register = (auth, email, password, org, firstName, lastName, phoneNumber) => dispatch => new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        setDoc(doc(getFirestore(), "users", getAuth().currentUser.uid), {
            org: org,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email
        })
        resolve()
    })
    .catch((error) => {
        reject(error)
    })
})

export const forgotPassword = (auth, email) => dispatch => new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
        resolve()
    })
    .catch((error) => {
        reject(error)
    })
})
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore"; 
import { UPDATE_PROFILE_IMAGE, USER_STATE_CHANGE } from "../constants";
import { getUserAnnouncements } from "./announcement";
import { getMessagePreviews } from "./messages";

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
            if (docSnap.data().type === "pnm") {
                dispatch(getUserAnnouncements(docSnap.data().org, docSnap.data().chapter));
                dispatch(getMessagePreviews());
                return dispatch({
                    type: USER_STATE_CHANGE,
                    currentUser: docSnap.data(),
                    userID: getAuth().currentUser.uid,
                    loaded: true,
                    photoURL: getAuth().currentUser.photoURL
                })
            } else if (docSnap.data().verified === true) {
                dispatch(getUserAnnouncements(docSnap.data().org, docSnap.data().chapter));
                dispatch(getMessagePreviews());
                return dispatch({
                    type: USER_STATE_CHANGE,
                    currentUser: docSnap.data(),
                    userID: getAuth().currentUser.uid,
                    loaded: true,
                    photoURL: getAuth().currentUser.photoURL
                })
            } else {
                dispatch(getUserAnnouncements(docSnap.data().org, docSnap.data().chapter));
                dispatch(getMessagePreviews());
                return dispatch({
                    type: USER_STATE_CHANGE,
                    currentUser: docSnap.data(),
                    userID: getAuth().currentUser.uid,
                    loaded: true,
                    photoURL: getAuth().currentUser.photoURL
                })
            }
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

export const register = (auth, email, password, org, firstName, lastName, chapter, phoneNumber, type) => dispatch => new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        if (type === "pnm") {
            setDoc(doc(getFirestore(), `organizations/${org}/pnms`, getAuth().currentUser.uid), {
                firstName,
                lastName
            });
        } else if (type === "active") {
            setDoc(doc(getFirestore(), `organizations/${org}/chapters/${chapter}/unverified`, getAuth().currentUser.uid), {
                firstName,
                lastName
            });
        }
        setDoc(doc(getFirestore(), "users", getAuth().currentUser.uid), {
            org,
            firstName,
            lastName,
            phoneNumber,
            email,
            type,
            chapter: (type === "active" ? chapter : null),
            verified: false,
            socials: []
        })
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

// MOVE TO PROFILE
export const updateProfileImage = (photoURL) => ({
    type: UPDATE_PROFILE_IMAGE,
    photoURL: photoURL
})

// MOVE TO PROFILE
export const updateProfile = (snapchat, instagram, twitter, facebook) => dispatch => new Promise((resolve, reject) => {
    updateDoc(doc(getFirestore(), "users", getAuth().currentUser.uid), {
        socials: {
            snapchat,
            instagram,
            twitter,
            facebook
        }
    })
    .then(() => {
        resolve();
    })
    .catch((error) => {
        reject(error);
    });
});
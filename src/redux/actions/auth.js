import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { deleteDoc, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore"; 
import { USER_STATE_CHANGE } from "../constants";
import { getUserAnnouncements } from "./announcement";

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
                getDoc(doc(getFirestore(), `organizations/${docSnap.data().org}/pnms`, getAuth().currentUser.uid))
                .then((ds) => {
                    if (ds.exists()) {
                        dispatch(getUserAnnouncements(ds.data().org, ds.data().chapter));
                        return dispatch({
                            type: USER_STATE_CHANGE,
                            currentUser: ds.data(),
                            userID: getAuth().currentUser.uid,
                            loaded: true,
                            photoURL: getAuth().currentUser.photoURL
                        })
                    }
                });
            } else if (docSnap.data().verified === true) {
                getDoc(doc(getFirestore(), `organizations/${docSnap.data().org}/chapters/${docSnap.data().chapter}/members`, getAuth().currentUser.uid))
                .then((ds) => {
                    if (ds.exists()) {
                        dispatch(getUserAnnouncements(ds.data().org, ds.data().chapter));
                        return dispatch({
                            type: USER_STATE_CHANGE,
                            currentUser: ds.data(),
                            userID: getAuth().currentUser.uid,
                            loaded: true,
                            photoURL: getAuth().currentUser.photoURL
                        })
                    }
                });
            } else {
                getDoc(doc(getFirestore(), `organizations/${docSnap.data().org}/chapters/${docSnap.data().chapter}/unverified`, getAuth().currentUser.uid))
                .then((ds) => {
                    if (ds.exists()) {
                        dispatch(getUserAnnouncements(ds.data().org, ds.data().chapter));
                        return dispatch({
                            type: USER_STATE_CHANGE,
                            currentUser: ds.data(),
                            userID: getAuth().currentUser.uid,
                            loaded: true,
                            photoURL: getAuth().currentUser.photoURL
                        })
                    }
                });
            }
            getDoc(doc(getFirestore(), `organizations/${docSnap.data().org}/users`, getAuth().currentUser.uid))
            .then((docSnap2) => {
                if (docSnap2.exists()) {
                    dispatch(getUserAnnouncements(docSnap2.data().org, docSnap2.data().chapter));
                    return dispatch({
                        type: USER_STATE_CHANGE,
                        currentUser: docSnap2.data(),
                        userID: getAuth().currentUser.uid,
                        loaded: true,
                        photoURL: getAuth().currentUser.photoURL
                    })
                }
            });
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
        setDoc(doc(getFirestore(), "users", getAuth().currentUser.uid), {
            org,
            chapter: (type === "active" ? chapter : null),
            type,
            verified: false
        })
        .then(() => {
            if (type === "pnm") {
                setDoc(doc(getFirestore(), `organizations/${org}/pnms`, getAuth().currentUser.uid), {
                    org,
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    type,
                    chapter: null,
                    verified: false,
                    socials: []
                });
            } else {
                setDoc(doc(getFirestore(), `organizations/${org}/chapters/${chapter}/unverified`, getAuth().currentUser.uid), {
                    org,
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    type,
                    chapter,
                    verified: false,
                    socials: []
                });
            }
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

export const verify = (org, chapter, uid, email, firstName, lastName, phoneNumber, socials) => dispatch => new Promise((resolve, reject) => {
    setDoc(doc(getFirestore(), `organizations/${org}/chapters/${chapter}/members`, uid), {
        org,
        firstName,
        lastName,
        phoneNumber,
        email,
        type: "active",
        chapter,
        verified: true,
        socials
    })
    .then(() => {
        deleteDoc(doc(getFirestore(), `organizations/${org}/chapters/${chapter}/unverified`, uid));
    })
    .catch((error) => {
        reject(error);
    });
});

export const updateProfile = (org, chapter, snapchat, instagram, twitter, facebook) => dispatch => new Promise((resolve, reject) => {
    updateDoc(doc(getFirestore(), `organizations/${org}/chapters/${chapter}/members`, getAuth().currentUser.uid), {
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
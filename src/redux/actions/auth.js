import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore"; 
import { Alert } from "react-native";
import { UPDATE_PROFILE_IMAGE, USER_STATE_CHANGE } from "../constants";
import { getUserAnnouncements } from "./announcement";
import { getMessagePreviews } from "./messages";

require("firebase/auth");

export const userAuthStateListener = () => {
    return async (dispatch) => {
        try {
            onAuthStateChanged(getAuth(), (user) => {
                if (user) {
                    dispatch(getCurrentUserData());
                } else {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: null, userID: null, loaded: true });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export const getCurrentUserData = () => {
    return async (dispatch) => {
        try {
            await getDoc(doc(getFirestore(), "users", getAuth().currentUser.uid))
            .then((docSnap) => {
                if (docSnap.exists()) {
                    if (docSnap.data().type === "pnm") {
                        dispatch({
                            type: USER_STATE_CHANGE,
                            currentUser: docSnap.data(),
                            userID: getAuth().currentUser.uid,
                            loaded: true,
                            photoURL: getAuth().currentUser.photoURL
                        });
                        dispatch(getUserAnnouncements(docSnap.data().org, docSnap.data().chapter));
                        dispatch(getMessagePreviews());
                    } else if (docSnap.data().verified === true) {
                        dispatch({
                            type: USER_STATE_CHANGE,
                            currentUser: docSnap.data(),
                            userID: getAuth().currentUser.uid,
                            loaded: true,
                            photoURL: getAuth().currentUser.photoURL
                        });
                        dispatch(getUserAnnouncements(docSnap.data().org, docSnap.data().chapter));
                        dispatch(getMessagePreviews());
                    } else {
                        dispatch({
                            type: USER_STATE_CHANGE,
                            currentUser: docSnap.data(),
                            userID: getAuth().currentUser.uid,
                            loaded: true,
                            photoURL: getAuth().currentUser.photoURL
                        });
                        dispatch(getUserAnnouncements(docSnap.data().org, docSnap.data().chapter));
                        dispatch(getMessagePreviews());
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export const login = (auth, email, password) => {
    return async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            switch(error.code) {
                case "auth/invalid-email":
                    Alert.alert("Invalid Email", "The email that you have entered is not valid.");
                    break;
                case "auth/user-not-found":
                    Alert.alert("User Not Found", "The credentials you have entered do not match an account.");
                    break;
                case "auth/wrong-password":
                    Alert.alert("Wrong Password", "The password you have entered does not match the username.");
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
    }
}

export const logout = () => {
    return async () => {
        try {
            await signOut(getAuth());
        } catch (error) {
            console.log(error);
        }
    }
}

export const register = (auth, email, password, org, firstName, lastName, chapter, phoneNumber, type) => {
    return async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
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
            })
        } catch (error) {
            switch(error.code) {
                case "auth/invalid-email":
                    Keyboard.dismiss();
                    Alert.alert("Invalid Email", "The email that you have entered is not valid.");
                    navigation.navigate("Email", {org, firstName, lastName, phoneNumber, type});
                    break;
                case "auth/email-already-in-use":
                    Keyboard.dismiss();
                    Alert.alert("Email Already In Use", "The email you have entered already belongs to someone.");
                    navigation.navigate("Email", {org, firstName, lastName, phoneNumber, type});
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
    }
}

export const forgotPassword = (auth, email) => {
    return async () => {
        try {
            await sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert("Reset Email Sent!", "Password reset email has been successfully sent.");
                useNavigation().navigate("Auth");
            })
        } catch (error) {
            switch(error.code) {
                case "auth/invalid-email":
                    Alert.alert("Invalid Email", "The email that you have entered is not valid.");
                    break;
                case "auth/user-not-found":
                    Alert.alert("User Not Found", "The email you entered does not match an account.");
                default:
                    console.log(error);
            }
        }
    }
}

// MOVE TO PROFILE
export const updateProfileImage = (photoURL) => ({
    type: UPDATE_PROFILE_IMAGE,
    photoURL: photoURL
})

// MOVE TO PROFILE
export const updateProfile = (snapchat, instagram, twitter, facebook) => {
    return async () => {
        try {
            await updateDoc(doc(getFirestore(), "users", getAuth().currentUser.uid), {
                socials: {
                    snapchat,
                    instagram,
                    twitter,
                    facebook
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}
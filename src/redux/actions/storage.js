import { USER_GET_PROFILE_IMAGE } from "../constants";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";

require("firebase/auth");

export const getUserProfileImage = () => dispatch => new Promise((resolve, reject) => {
    getDownloadURL(ref(getStorage(), `users/${getAuth().currentUser.uid}/profile.jpeg`))
    .then((url) => {
        updateProfile(getAuth().currentUser, {
            photoURL: url
        })
        dispatch({ type: USER_GET_PROFILE_IMAGE, url: url});
    })
    .catch((error) => {
        reject(error);
    });

})
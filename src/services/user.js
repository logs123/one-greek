import { getAuth } from "firebase/auth"
import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { saveMediaToStorage } from "./random"


export const saveUserProfileImage = (image) => new Promise((resolve, reject) => {
    saveMediaToStorage(image, "profileImage/" + getAuth().currentUser.uid)
    .then((res) => {
        updateDoc(doc(getFirestore(), "users/" + getAuth().currentUser.uid), {
            photoURL: res
        })
        .then(() => resolve())
        .catch(() => reject());
    });
});
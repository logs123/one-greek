import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
require("firebase/storage");

export const saveMediaToStorage = (media, path) => dispatch => new Promise((resolve, reject) => {
    const fileRef = ref(getStorage(), path);
    console.log(fileRef)

    fetch(media)
    .then(response => response.blob())
    .then(blob => uploadBytes(fileRef, blob))
    .then(task => getDownloadURL(ref(fileRef, task.ref)))
    .then(downloadURL => resolve(downloadURL))
    .catch(() => reject());
});
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { GET_USERS_BY_CHAPTER } from "../constants";

require("firebase/auth");

export const getUsersByChapter = (chapter) => {
    return async (dispatch) => {
        try {
            await getDocs(query(collection(getFirestore(), "users"), where("chapter", "==", chapter), where("verified", "==", true)))
            .then((docs) => {
                const users = [];
                docs.forEach((doc) => {
                    if (doc.id !== getAuth().currentUser.uid)
                    users.push({id: doc.id, ...doc.data()});
                })
                dispatch({ type: GET_USERS_BY_CHAPTER, chapterUsers: users});
            })
        } catch (error) {
            console.log(error);
        }
    }
}
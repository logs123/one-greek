import { collection, getDocs, getFirestore } from "firebase/firestore";
import { CHAPTER_LIST_LOAD, ORG_LIST_LOAD, UPDATE_SELECTED_CHAPTER, UPDATE_SELECTED_ORG } from "../constants";

require("firebase/auth");

export const getOrganizations = () => {
    return async (dispatch) => {
        try {
            await getDocs(collection(getFirestore(),"organizations"))
            .then((docs) => {
                const list = [];
                docs.forEach((doc) => {
                    list.push({id: doc.id, data: doc.data().name})
                });
                dispatch({ type: ORG_LIST_LOAD, orgs: list });
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getChapters = (org) => {
    return async (dispatch) => {
        try {
            await getDocs(collection(getFirestore(),"organizations/" + org + "/chapters"))
            .then((docs) => {
                const list = [];
                docs.forEach((doc) => {
                    list.push({id: doc.id, data: doc.data().name})
                });
                dispatch({ type: CHAPTER_LIST_LOAD, chapters: list });
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateSelectedOrg = (org) => ({
    type: UPDATE_SELECTED_ORG,
    org: org
});

export const updateSelectedChapter = (chapter) => ({
    type: UPDATE_SELECTED_CHAPTER,
    chapter: chapter
});
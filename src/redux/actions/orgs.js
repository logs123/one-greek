import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ORG_LIST_LOAD } from "../constants";

require("firebase/auth");

export const getOrganizations = () => dispatch => new Promise((resolve, reject) => {
    getDocs(collection(getFirestore(),"organizations"))
    .then((docs) => {
        const list = [];
        docs.forEach((doc) => {
            list.push({id: doc.id, data: doc.data().name})
        });
        return dispatch({
            type: ORG_LIST_LOAD,
            orgs: list
        });
    })
    .catch((error) => {
        reject(error)
    });
});
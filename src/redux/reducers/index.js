import { combineReducers } from "redux";
import { auth } from "./auth";
import { announcement } from "./announcement";
import { orgs } from "./orgs";

const Reducers = combineReducers({
    auth,
    announcement,
    orgs
});

export default Reducers;
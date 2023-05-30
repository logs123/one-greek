import { combineReducers } from "redux";
import { auth } from "./auth";
import { announcement } from "./announcement";
import { orgs } from "./orgs";
import { admin } from "./admin";

const Reducers = combineReducers({
    auth,
    announcement,
    orgs,
    admin
});

export default Reducers;
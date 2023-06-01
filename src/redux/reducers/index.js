import { combineReducers } from "redux";
import { auth } from "./auth";
import { announcement } from "./announcement";
import { orgs } from "./orgs";
import { admin } from "./admin";
import { messages } from "./messages";
import { users } from "./users";

const Reducers = combineReducers({
    auth,
    announcement,
    orgs,
    admin,
    messages,
    users
});

export default Reducers;
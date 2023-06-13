import { combineReducers } from "redux";
import { auth } from "./auth";
import { announcement } from "./announcement";
import { orgs } from "./orgs";
import { admin } from "./admin";
import { chat } from "./chat";
import { users } from "./users";

const Reducers = combineReducers({
    auth,
    announcement,
    orgs,
    admin,
    chat,
    users
});

export default Reducers;
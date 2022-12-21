import { combineReducers } from "redux";
import { auth } from "./auth";
import { announcement } from "./announcement";

const Reducers = combineReducers({
    auth,
    announcement
});

export default Reducers;
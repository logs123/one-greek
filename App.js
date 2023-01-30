import React from "react";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

import { getApps, initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./src/redux/reducers";

import Constants from "expo-constants";

import Route from "./src/navigation/main";
import { getStorage } from "firebase/storage";

const store = createStore(rootReducer, applyMiddleware(thunk));

if (getApps().length < 1) {
  const app = initializeApp(Constants.manifest.web.config.firebase);
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  const storage = getStorage(app);
}

export default function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}
import {configureStore} from "@reduxjs/toolkit";
import storageService from "../../storage/boundary/StorageService.ts";
import rootReducer from "./RootReducer.ts";

const preloadedState = storageService.load() || {};
const applicationStore = configureStore({reducer: rootReducer, preloadedState});

applicationStore.subscribe(() => {
  storageService.save(applicationStore.getState());
})

export default applicationStore
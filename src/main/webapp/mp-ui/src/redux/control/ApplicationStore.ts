import {configureStore} from "@reduxjs/toolkit";
import storageService from "../../storage/boundary/StorageService";
import rootReducer from "./RootReducer";

const preloadedState = storageService.load() || {};
const applicationStore = configureStore({reducer: rootReducer, preloadedState});

applicationStore.subscribe(() => {
  storageService.save(applicationStore.getState());
})

export default applicationStore
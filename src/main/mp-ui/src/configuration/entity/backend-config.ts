// Application Root URL
import {BackendConfiguration} from "./ConfigurationState.ts";

let _backendRootUrl = "";

export const backendRootUrl = () => {
    return _backendRootUrl;
}

_backendRootUrl = "http://localhost:51080/resources"; // default (local)

export const fetchBackendConfiguration = async () => {
    return fetch("/configuration/backend.json").then(r => r.json().then(j => j as BackendConfiguration));
}

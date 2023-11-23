import {appName} from "../../configuration/entity/app-config.ts";

const KEY = `${appName()}.localstorage`;

class StorageService {
    save(data: any, key: string = KEY) {
        const serialized = JSON.stringify(data);
        localStorage.setItem(key, serialized);
    }

    load(key: string = KEY): any | null {
        const serialized = localStorage.getItem(key);
        return serialized !== null && JSON.parse(serialized);
    }

    reset(key: string = KEY): any {
        this.save({}, key);
    }

}

const storageService = new StorageService();

export default storageService;
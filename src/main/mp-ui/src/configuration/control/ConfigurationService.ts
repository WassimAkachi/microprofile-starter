import {appName, appRootUrl, appVersion} from "../entity/app-config.ts";
import {fetchBackendConfiguration} from "../entity/backend-config.ts";
import {changeBackendConfiguration} from "./ConfigurationDispatcher.ts";
import {BackendConfiguration} from "../entity/ConfigurationState.ts";

const holder = {
    data: {
        applicationName: appName(),
        applicationVersion: appVersion(),
        applicationRootUrl: appRootUrl()
    }
};

export class ConfigurationService {
    private _backendConfiguration?: BackendConfiguration

    constructor() {
        this._init(_ => {
        }).then(_r => console.debug(""))
    }

    private async _init(f: (bc: BackendConfiguration) => void) {
        if (this._backendConfiguration == undefined) {
            return fetchBackendConfiguration()
                .then(backendConfiguration => {
                    changeBackendConfiguration(backendConfiguration);
                    this._backendConfiguration = backendConfiguration;
                    return backendConfiguration;
                })
                .then(backendConfig => f(backendConfig));
        } else {
            f(this._backendConfiguration)
        }
    }

    get applicationName() {
        return holder.data.applicationName;
    }

    get applicationVersion() {
        return holder.data.applicationVersion;
    }

    public async consumeBackendConfiguration(f: (bc: BackendConfiguration) => void) {
        if (this._backendConfiguration) {
            f(this._backendConfiguration)
        } else {
            await this._init(f);
        }
    }
}

const configurationService = new ConfigurationService();

export default configurationService
import {appName, appRootUrl, appVersion} from "../entity/app-config.ts";
import {fetchBackendConfiguration} from "../entity/backend-config.ts";
import {changeBackendConfiguration} from "./ConfigurationDispatcher.ts";
import {BackendConfiguration} from "../entity/ConfigurationState.ts";
import {
    ORDER_CONFIG_FETCH,
    ORDER_PRE_CONFIG_FETCH,
    registerInitialTask
} from "../../app/control/MpStarterAppBootstrap.ts";

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
        this.init(_ => {
        }).then(_r => console.debug(""))
    }

    async init(f: (bc: BackendConfiguration) => void) {
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
            await this.init(f);
        }
    }

}

const configurationService = new ConfigurationService();

registerInitialTask({
    order: ORDER_PRE_CONFIG_FETCH,
    task: fetchBackendConfiguration,
    name: 'fetchBackendConfiguration'
});

registerInitialTask({
    order: ORDER_CONFIG_FETCH,
    task: () => configurationService.init(_ => {}),
    name: 'configurationService.init'
});

export default configurationService
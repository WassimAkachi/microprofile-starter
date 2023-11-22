import {SupportMatrix} from "../entity/Entities.ts";
import configurationService, {ConfigurationService} from "../../configuration/control/ConfigurationService.ts";
import {BackendConfiguration} from "../../configuration/entity/ConfigurationState.ts";
import {setSupportMatrix} from "../entity/MpStarterBackendStoreSlice.ts";
import applicationStore from "../../redux/control/ApplicationStore.ts";
import {
    readMpStarterBackendConfiguration,
    readMpStarterBackendState,
    readSupportMatrix
} from "./MpStarterBackendStateReader.ts";


export class MpStarterBackendConnector {
    private _configService: ConfigurationService;
    private _backendConfiguration?: BackendConfiguration

    constructor(configService: ConfigurationService) {
        this._configService = configService;
        this._backendConfiguration = undefined;
    }

    public init() {
        if (this._backendConfiguration == undefined) {
            return this._configService.consumeBackendConfiguration(cd => this._backendConfiguration = cd);
        } else {
            return Promise.resolve();
        }
    }

    private get baseUrl() {
        return this._backendConfiguration?.baseUrl
    }

    private endPoint(endPointId: string): string | undefined {
        return this._backendConfiguration?.endPoints[endPointId]
    }

    public async getSupportMatrix(): Promise<SupportMatrix> {
        const supportMatrix = readSupportMatrix(readMpStarterBackendConfiguration(readMpStarterBackendState(applicationStore.getState())))
        if (supportMatrix) {
            return Promise.resolve(supportMatrix)
        } else {
            return this.init().then(_ => fetch(`${this.baseUrl}${this.endPoint('supportMatrix')}`)
                .then(async (r: Response) => {
                        if (r.ok) {
                            const supportMatrix = await r.json().then(j => j as SupportMatrix);
                            applicationStore.dispatch(setSupportMatrix(supportMatrix));
                            return supportMatrix
                        } else {
                            return {} as SupportMatrix;
                        }
                    }
                )
            )
        }
    }
}


const mpStarterBackendConnector = new MpStarterBackendConnector(configurationService);
mpStarterBackendConnector.getSupportMatrix().then(_ => console.debug("SupportMatrix are loaded"));
export default mpStarterBackendConnector;
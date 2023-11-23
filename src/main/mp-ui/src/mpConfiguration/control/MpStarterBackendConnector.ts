import {SupportMatrix, SupportMatrixServers} from "../entity/Entities.ts";
import configurationService, {ConfigurationService} from "../../configuration/control/ConfigurationService.ts";
import {BackendConfiguration} from "../../configuration/entity/ConfigurationState.ts";
import applicationStore from "../../redux/control/ApplicationStore.ts";
import {
    readMpStarterBackendConfiguration,
    readMpStarterBackendState,
    readSupportMatrix,
    readSupportMatrixServers
} from "./MpStarterBackendStateReader.ts";
import {ORDER_CONFIG_FETCH, registerInitialTask} from "../../app/control/MpStarterAppBootstrap.ts";
import {changeSupportMatrix, changeSupportMatrixServers} from "./MpStarterbackendDispatcher.ts";


export class MpStarterBackendConnector {
    private _configService: ConfigurationService;
    private _backendConfiguration?: BackendConfiguration

    constructor(configService: ConfigurationService) {
        this._configService = configService;
    }

    public init() {
        if (this._backendConfiguration == undefined) {
            return this._configService.consumeBackendConfiguration(cd => this._backendConfiguration = cd);
        } else {
            return Promise.resolve();
        }
    }

    private get baseUrl(): string | undefined {
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
            return fetch(`${this.baseUrl}${this.endPoint('supportMatrix')}`)
                .then(async (r: Response) => {
                        if (r.ok) {
                            const supportMatrix = await r.json().then(j => j as SupportMatrix);
                            changeSupportMatrix(supportMatrix);
                            return supportMatrix
                        } else {
                            return {} as SupportMatrix;
                        }
                    }
                );
        }
    }

    public async getSupportMatrixServers(): Promise<SupportMatrixServers> {
        const supportMatrixServers = readSupportMatrixServers(readMpStarterBackendConfiguration(readMpStarterBackendState(applicationStore.getState())))
        if (supportMatrixServers) {
            return Promise.resolve(supportMatrixServers)
        } else {
            return this.init().then(_ => fetch(`${this.baseUrl}${this.endPoint('supportMatrixServers')}`)
                .then(async (r: Response) => {
                        if (r.ok) {
                            const supportMatrixServers = await r.json().then(j => j as SupportMatrixServers);
                            changeSupportMatrixServers(supportMatrixServers);
                            return supportMatrixServers
                        } else {
                            return {} as SupportMatrixServers;
                        }
                    }
                )
            )
        }
    }

    public async downloadProject(queryParameters: Record<string, any>): Promise<void> {
        const downloadUrl = this.createDownloadUrl(queryParameters)
        return fetch(downloadUrl)
            .then(r => r.blob())
            .then(b => {
                const file = window.URL.createObjectURL(b);
                const anchorElement = document.createElement('a');
                anchorElement.href = file;
                anchorElement.setAttribute('download', `${queryParameters['artifactId']}.zip`);
                anchorElement.click();
            });
    }

    createDownloadUrl = (queryParameters: Record<string, any>): string => {
        //await this.init();
        console.debug({queryParameters})
        const specs = queryParameters['selectedSpecs'];
        let selectedSpecs = ""
        if (Array.isArray(specs) && specs.length > 0) {
            selectedSpecs = "&" + specs.map(s => 'selectedSpecs=' + encodeURIComponent(s)).join('&');
        }
        delete queryParameters['selectedSpecs'];
        return `${this.baseUrl}${this.endPoint('project')}?${(new URLSearchParams(queryParameters)).toString()}${selectedSpecs}`;
    }
}

const mpStarterBackendConnector = new MpStarterBackendConnector(configurationService);

registerInitialTask({
    order: ORDER_CONFIG_FETCH + 1,
    task: () => mpStarterBackendConnector.init(),
    name: 'mpStarterBackendConnector.getSupportMatrix'
});

registerInitialTask({
    order: ORDER_CONFIG_FETCH + 10,
    task: () => mpStarterBackendConnector.getSupportMatrix(),
    name: 'mpStarterBackendConnector.getSupportMatrix'
});

registerInitialTask({
    order: ORDER_CONFIG_FETCH + 10,
    task: () => mpStarterBackendConnector.getSupportMatrixServers(),
    name: 'mpStarterBackendConnector.getSupportMatrix'
});

export default mpStarterBackendConnector;
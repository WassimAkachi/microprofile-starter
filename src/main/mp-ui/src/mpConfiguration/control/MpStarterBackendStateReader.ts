import {MpStarterBackendConfiguration, MpStarterBackendState} from "../entity/MpStarterBackendState.ts";
import {
    getInitialMpStarterBackendState,
    mpStarterBackendStateSliceName
} from "../entity/MpStarterBackendConfigurationConstants.ts";
import {MPOptionsAvailable, MpOptionsAvailableServer, SupportMatrix, SupportMatrixServers} from "../entity/Entities.ts";

export const readMpStarterBackendState = (state: any): MpStarterBackendState => {
    if (typeof state === 'object' && !Array.isArray(state) && Object.keys(state).includes(mpStarterBackendStateSliceName)) {
        return state[mpStarterBackendStateSliceName] as MpStarterBackendState;
    } else {
        return getInitialMpStarterBackendState();
    }
};

export const readMpStarterBackendConfiguration = (mpStarterBackendState?: MpStarterBackendState): MpStarterBackendConfiguration => mpStarterBackendState && mpStarterBackendState.state || {} as MpStarterBackendConfiguration;

export const readIsPending = (mpStarterBackendConfiguration?: MpStarterBackendState): boolean => mpStarterBackendConfiguration && mpStarterBackendConfiguration.actionState === "Pending" || false;

export const readHasError = (mpStarterFormState?: MpStarterBackendState): boolean => mpStarterFormState && mpStarterFormState.actionState === "Error" || false;

export const readError = (mpStarterBackendState?: MpStarterBackendState) => mpStarterBackendState && mpStarterBackendState.errorMessage;

export const readSupportMatrix = (mpStarterBackendConfiguration?: MpStarterBackendConfiguration): SupportMatrix | undefined => mpStarterBackendConfiguration && mpStarterBackendConfiguration.supportMatrix;

export const readSupportMatrixServers = (mpStarterBackendConfiguration?: MpStarterBackendConfiguration): SupportMatrixServers | undefined => mpStarterBackendConfiguration && mpStarterBackendConfiguration.supportMatrixServers;

export const readServers = (serverId: string, mpStarterBackendConfiguration?: MpStarterBackendConfiguration): MpOptionsAvailableServer[] | undefined => {
    if (!mpStarterBackendConfiguration || !mpStarterBackendConfiguration.supportMatrixServers) {
        return undefined;
    }
    return mpStarterBackendConfiguration.supportMatrixServers.configs[serverId] || undefined;
};

export const readMpVersion = (mpVersion: string, mpStarterBackendConfiguration?: MpStarterBackendConfiguration): MPOptionsAvailable | undefined => {
    if (mpStarterBackendConfiguration == undefined) {
        return undefined;
    }

    if (mpStarterBackendConfiguration.supportMatrix == undefined) {
        return undefined;
    }

    return mpStarterBackendConfiguration.supportMatrix.configs[mpVersion]
};

export const readMpSpecDescription = (specId: string, mpStarterBackendConfiguration?: MpStarterBackendConfiguration) => {
    if (mpStarterBackendConfiguration == undefined) {
        return undefined;
    }


    if (mpStarterBackendConfiguration.supportMatrix == undefined) {
        return undefined;
    }

    return mpStarterBackendConfiguration.supportMatrix.descriptions[specId]

}


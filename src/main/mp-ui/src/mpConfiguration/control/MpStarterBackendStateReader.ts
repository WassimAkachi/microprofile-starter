import {MpStarterBackendConfiguration, MpStarterBackendState} from "../entity/MpStarterBackendState.ts";
import {
    getInitialMpStarterBackendState,
    mpStarterBackendStateSliceName
} from "../entity/MpStarterBackendConfigurationConstants.ts";
import {SupportMatrix} from "../entity/Entities.ts";

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

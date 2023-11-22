import {configurationSliceName, getInitialConfigurationState} from "../entity/ConfigurationConstants.ts";
import {BackendConfiguration, Configuration, ConfigurationState} from "../entity/ConfigurationState.ts";

export const readConfigurationState = (state: any): ConfigurationState => {
    if (typeof state === 'object' && !Array.isArray(state) && Object.keys(state).includes(configurationSliceName)) {
        return state[configurationSliceName] as ConfigurationState;
    } else {
        return getInitialConfigurationState();
    }
};

export const readConfiguration = (configurationState?: ConfigurationState): Configuration | undefined => configurationState && configurationState.state;

export const readBackendConfiguration = (configuration?: Configuration): BackendConfiguration | undefined => configuration?.backendConfiguration;

export const readIsPending = (MpStarterFormState?: ConfigurationState): boolean => MpStarterFormState && MpStarterFormState.actionState === "Pending" || false;

export const readHasError = (MpStarterFormState?: ConfigurationState): boolean => MpStarterFormState && MpStarterFormState.actionState === "Error" || false;

export const readError = (MpStarterFormState?: ConfigurationState) => MpStarterFormState && MpStarterFormState.errorMessage;

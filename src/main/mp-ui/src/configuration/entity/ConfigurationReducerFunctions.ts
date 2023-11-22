import {BackendConfiguration, Configuration, ConfigurationState,} from "./ConfigurationState.ts";

export const fulfillState = (state: ConfigurationState) => {
    state.actionState = "Fulfilled";
    state.errorMessage = undefined;
};

function _initStateIfNull(state: ConfigurationState) {
    if (state.state == null) {
        state.state = {} as Configuration;
    }
}

export const setBackendConfigurationInState = (state: ConfigurationState, backendConfig?: BackendConfiguration) => {
    _initStateIfNull(state);
    state.state!.backendConfiguration = backendConfig
};

import {ConfigurationState} from "./ConfigurationState.ts";

export const configurationSliceName: 'configurationState' = 'configurationState'

export const getInitialConfigurationState = (): ConfigurationState => ({
    actionState: "Fulfilled",
    state: undefined
});



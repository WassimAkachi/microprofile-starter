import {BackendConfiguration, ConfigurationState} from "./ConfigurationState.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {configurationSliceName, getInitialConfigurationState} from "./ConfigurationConstants.ts";
import {fulfillState, setBackendConfigurationInState} from "./ConfigurationReducerFunctions.ts";


const reducers = {
    clearError(state: ConfigurationState) {
        fulfillState(state);
    },
    setBackendConfiguration(state: ConfigurationState, action: PayloadAction<BackendConfiguration>) {
        setBackendConfigurationInState(state, action.payload);
        fulfillState(state);
    },
    reset(state: ConfigurationState) {
        state.state = undefined;
        fulfillState(state);
    }
};

const initialState = getInitialConfigurationState();

const sliceOptions = {
    name: configurationSliceName,
    initialState,
    reducers
}

const configurationSlice = createSlice(sliceOptions);

export const {
    clearError,
    setBackendConfiguration,
    reset
} = configurationSlice.actions;
export default configurationSlice.reducer;
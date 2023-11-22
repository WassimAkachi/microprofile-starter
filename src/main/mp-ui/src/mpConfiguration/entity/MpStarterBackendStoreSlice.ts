import {MpStarterBackendState} from "./MpStarterBackendState.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fulfillState, setSupportMatrixInState} from "./MpStarterBackendReducerFunctions.ts";
import {SupportMatrix} from "./Entities.ts";
import {
    getInitialMpStarterBackendState,
    mpStarterBackendStateSliceName
} from "./MpStarterBackendConfigurationConstants.ts";


const reducers = {
    clearError(state: MpStarterBackendState) {
        fulfillState(state);
    },
    setSupportMatrix(state: MpStarterBackendState, action: PayloadAction<SupportMatrix>) {
        setSupportMatrixInState(state, action.payload);
        fulfillState(state);
    },
    reset(state: MpStarterBackendState) {
        state.state = undefined;
        fulfillState(state);
    }
};

const initialState = getInitialMpStarterBackendState();

const sliceOptions = {
    name: mpStarterBackendStateSliceName,
    initialState,
    reducers
}

const mpStarterBackendSlice = createSlice(sliceOptions);

export const {
    clearError,
    setSupportMatrix,
    reset
} = mpStarterBackendSlice.actions;
export default mpStarterBackendSlice.reducer;
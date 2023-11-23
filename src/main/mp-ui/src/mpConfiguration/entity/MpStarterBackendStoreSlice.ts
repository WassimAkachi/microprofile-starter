import {MpStarterBackendState} from "./MpStarterBackendState.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    fulfillState,
    setSupportMatrixInState,
    setSupportMatrixServersInState
} from "./MpStarterBackendReducerFunctions.ts";
import {SupportMatrix, SupportMatrixServers} from "./Entities.ts";
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
    setSupportMatrixServers(state: MpStarterBackendState, action: PayloadAction<SupportMatrixServers>) {
        setSupportMatrixServersInState(state, action.payload);
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
    setSupportMatrixServers,
    reset
} = mpStarterBackendSlice.actions;
export default mpStarterBackendSlice.reducer;
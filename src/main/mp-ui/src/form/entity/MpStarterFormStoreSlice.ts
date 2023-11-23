import {MpStarterFormState} from "./MpStarterFormState.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getInitialMpStarterFormState, mpStarterFormSliceName} from "./MpStarterFormConstants.ts";
import {
    fulfillState,
    setArtifactIdInState,
    setBuildToolInState,
    setGroupIdInState,
    setJavaVersionInState,
    setMpSpecsInState,
    setMpVersionInState,
    setRuntimeVersionInState
} from "./MpStarterFormReducerFunctions.ts";


const reducers = {
    clearError(state: MpStarterFormState) {
        fulfillState(state);
    },
    setGroupId(state: MpStarterFormState, action: PayloadAction<string>) {
        setGroupIdInState(state, action.payload);
        fulfillState(state);
    },
    setArtifactId(state: MpStarterFormState, action: PayloadAction<string>) {
        setArtifactIdInState(state, action.payload);
        fulfillState(state);
    },
    setMpVersion(state: MpStarterFormState, action: PayloadAction<string>) {
        setMpVersionInState(state, action.payload);
        fulfillState(state);
    },
    setJavaVersion(state: MpStarterFormState, action: PayloadAction<string>) {
        setJavaVersionInState(state, action.payload);
        fulfillState(state);
    },
    setBuildTool(state: MpStarterFormState, action: PayloadAction<string>) {
        setBuildToolInState(state, action.payload);
        fulfillState(state);
    },
    setRuntimeVersion(state: MpStarterFormState, action: PayloadAction<string>) {
        setRuntimeVersionInState(state, action.payload);
        fulfillState(state);
    },
    setMpSpecs(state: MpStarterFormState, action: PayloadAction<string[]>) {
        setMpSpecsInState(state, action.payload);
        fulfillState(state);
    },
    reset(state: MpStarterFormState) {
        state.state = undefined;
        fulfillState(state);
    }
};

const initialState = getInitialMpStarterFormState();

const sliceOptions = {
    name: mpStarterFormSliceName,
    initialState,
    reducers
}

const mpStarterFormSlice = createSlice(sliceOptions);

export const {
    clearError,
    setGroupId,
    setArtifactId,
    setMpVersion,
    setJavaVersion,
    setRuntimeVersion,
    setBuildTool,
    setMpSpecs,
    reset
} = mpStarterFormSlice.actions;
export default mpStarterFormSlice.reducer;
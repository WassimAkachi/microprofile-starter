import {MpStarterFormState, MpStarterProject} from "./MpStarterFormState.ts";

export const fulfillState = (state: MpStarterFormState) => {
    state.actionState = "Fulfilled";
    state.errorMessage = undefined;
};

function _initStateIfNull(state: MpStarterFormState) {
    if (state.state == null) {
        state.state = {} as MpStarterProject;
    }
}

export const setGroupIdInState = (state: MpStarterFormState, groupId?: string) => {
    _initStateIfNull(state);
    state.state!.groupId = groupId
};

export const setArtifactIdInState = (state: MpStarterFormState, artifactId?: string) => {
    _initStateIfNull(state);
    state.state!.artifactId = artifactId
};

export const setMpVersionInState = (state: MpStarterFormState, mpVersion?: string) => {
    _initStateIfNull(state);
    state.state!.mpVersion = mpVersion
};

export const setJavaVersionInState = (state: MpStarterFormState, javaVersion?: string) => {
    _initStateIfNull(state);
    state.state!.javaVersion = javaVersion
};

export const setBuildToolInState = (state: MpStarterFormState, javaVersion?: string) => {
    _initStateIfNull(state);
    state.state!.buildTool = javaVersion
};

export const setRuntimeVersionInState = (state: MpStarterFormState, runtimeVersion?: string) => {
    _initStateIfNull(state);
    state.state!.mpRuntime = runtimeVersion
};

export const setMpSpecsInState = (state: MpStarterFormState, mpSpecs: string[]) => {
    _initStateIfNull(state);
    state.state!.mpSpecs = [...mpSpecs]
};

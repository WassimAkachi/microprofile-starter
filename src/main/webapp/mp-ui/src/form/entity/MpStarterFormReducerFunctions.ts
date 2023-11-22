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

export const setGroupIdInState = (state: MpStarterFormState, groupId: string) => {
    _initStateIfNull(state);
    state.state!.groupId = groupId
};

export const setArtifactIdInState = (state: MpStarterFormState, artifactId: string) => {
    _initStateIfNull(state);
    state.state!.artifactId = artifactId
};

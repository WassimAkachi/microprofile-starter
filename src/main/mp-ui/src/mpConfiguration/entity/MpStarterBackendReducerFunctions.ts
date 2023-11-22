import {MpStarterBackendConfiguration, MpStarterBackendState,} from "./MpStarterBackendState.ts";
import {SupportMatrix} from "./Entities.ts";

export const fulfillState = (state: MpStarterBackendState) => {
    state.actionState = "Fulfilled";
    state.errorMessage = undefined;
};

function _initStateIfNull(state: MpStarterBackendState) {
    if (state.state == null) {
        state.state = {} as MpStarterBackendConfiguration;
    }
}

export const setSupportMatrixInState = (state: MpStarterBackendState, supportMatrix?: SupportMatrix) => {
    _initStateIfNull(state);
    state.state!.supportMatrix = supportMatrix
};

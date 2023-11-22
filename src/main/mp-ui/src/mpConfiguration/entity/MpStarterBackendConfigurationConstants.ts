import {MpStarterBackendState} from "./MpStarterBackendState.ts";

export const mpStarterBackendStateSliceName: 'mpStarterBackendStateSlice' = 'mpStarterBackendStateSlice'

export const getInitialMpStarterBackendState = (): MpStarterBackendState => ({
    actionState: "Fulfilled",
    state: undefined
});



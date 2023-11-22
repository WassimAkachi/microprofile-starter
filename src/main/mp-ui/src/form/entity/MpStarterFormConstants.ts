import {MpStarterFormState} from "./MpStarterFormState.ts";

export const mpStarterFormSliceName: 'MpStarterFormState' = 'MpStarterFormState'

export const getInitialMpStarterFormState = (): MpStarterFormState => ({
    actionState: "Fulfilled",
    state: undefined
});



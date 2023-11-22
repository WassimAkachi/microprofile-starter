import {getInitialMpStarterFormState, mpStarterFormSliceName} from "../entity/MpStarterFormConstants";
import {MpStarterFormState, MpStarterProject} from "../entity/MpStarterFormState.ts";

export const readMpStarterFormState = (state: any): MpStarterFormState => {
    if (typeof state === 'object' && !Array.isArray(state) && Object.keys(state).includes(mpStarterFormSliceName)) {
        return state[mpStarterFormSliceName] as MpStarterFormState;
    } else {
        return getInitialMpStarterFormState();
    }
};

export const readProject = (MpStarterFormState?: MpStarterFormState): MpStarterProject => MpStarterFormState && MpStarterFormState.state || {} as MpStarterProject

export const readIsPending = (MpStarterFormState?: MpStarterFormState): boolean => MpStarterFormState && MpStarterFormState.actionState === "Pending" || false;

export const readHasError = (MpStarterFormState?: MpStarterFormState): boolean => MpStarterFormState && MpStarterFormState.actionState === "Error" || false;

export const readError = (MpStarterFormState?: MpStarterFormState) => MpStarterFormState && MpStarterFormState.errorMessage;

export const readGroupId = (MpStarterFormState?: MpStarterFormState): string | undefined => readProject(MpStarterFormState).groupId;

export const readArtifactId = (MpStarterFormState?: MpStarterFormState): string | undefined => readProject(MpStarterFormState).artifactId;
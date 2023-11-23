import {getInitialMpStarterFormState, mpStarterFormSliceName} from "../entity/MpStarterFormConstants.ts";
import {MpStarterFormState, MpStarterProject} from "../entity/MpStarterFormState.ts";

export const readMpStarterFormState = (state: any): MpStarterFormState => {
    if (typeof state === 'object' && !Array.isArray(state) && Object.keys(state).includes(mpStarterFormSliceName)) {
        return state[mpStarterFormSliceName] as MpStarterFormState;
    } else {
        return getInitialMpStarterFormState();
    }
};

export const readProject = (mpStarterFormState?: MpStarterFormState): MpStarterProject => mpStarterFormState && mpStarterFormState.state || {} as MpStarterProject

export const readIsPending = (mpStarterFormState?: MpStarterFormState): boolean => mpStarterFormState && mpStarterFormState.actionState === "Pending" || false;

export const readHasError = (mpStarterFormState?: MpStarterFormState): boolean => mpStarterFormState && mpStarterFormState.actionState === "Error" || false;

export const readError = (mpStarterFormState?: MpStarterFormState) => mpStarterFormState && mpStarterFormState.errorMessage;

export const readGroupId = (mpStarterFormState?: MpStarterFormState): string | undefined => readProject(mpStarterFormState).groupId;

export const readArtifactId = (mpStarterFormState?: MpStarterFormState): string | undefined => readProject(mpStarterFormState).artifactId;

export const readRuntimeVersion = (mpStarterFormState?: MpStarterFormState): string | undefined => readProject(mpStarterFormState).mpRuntime;

export const readBuildTool = (mpStarterFormState?: MpStarterFormState): string | undefined => readProject(mpStarterFormState).buildTool;

export const readMpVersionId = (mpStarterFormState?: MpStarterFormState): string | undefined => readProject(mpStarterFormState).mpVersion;

export const readJavaVersion = (mpStarterFormState?: MpStarterFormState): string | undefined => readProject(mpStarterFormState).javaVersion;

export const readMpSpecs = (mpStarterFormState?: MpStarterFormState): string[] => readProject(mpStarterFormState).mpSpecs || [];

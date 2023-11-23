import applicationStore from "../../redux/control/ApplicationStore.ts";
import {
    clearError,
    reset,
    setArtifactId, setBuildTool,
    setGroupId,
    setJavaVersion, setMpSpecs,
    setMpVersion,
    setRuntimeVersion
} from "../entity/MpStarterFormStoreSlice.ts";

export const changeGroupId = (value: string) => applicationStore.dispatch(setGroupId(value));
export const changeArtifactId = (value: string) => applicationStore.dispatch(setArtifactId(value));
export const changeMpVersion = (value: string) => applicationStore.dispatch(setMpVersion(value));
export const changeJavaVersion = (value: string) => applicationStore.dispatch(setJavaVersion(value));
export const changeBuildTool = (value: string) => applicationStore.dispatch(setBuildTool(value));
export const changeRuntimeVersion = (value: string) => applicationStore.dispatch(setRuntimeVersion(value));
export const changeMpSpecs = (value: string[]) => applicationStore.dispatch(setMpSpecs(value));
export const changeReset = () => applicationStore.dispatch(reset(undefined));
export const changeClearError = () => applicationStore.dispatch(clearError());

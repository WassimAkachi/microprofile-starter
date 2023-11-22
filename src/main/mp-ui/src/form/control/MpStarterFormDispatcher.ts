import applicationStore from "../../redux/control/ApplicationStore.ts";
import {
    clearError,
    reset,
    setArtifactId,
    setGroupId,
    setJavaVersion,
    setMpVersion
} from "../entity/MpStarterFormStoreSlice.ts";

export const changeGroupId = (value: string) => applicationStore.dispatch(setGroupId(value));
export const changeArtifactId = (value: string) => applicationStore.dispatch(setArtifactId(value));
export const changeMpVersion = (value: string) => applicationStore.dispatch(setMpVersion(value));
export const changeJavaVersion = (value: string) => applicationStore.dispatch(setJavaVersion(value));
export const changeReset = () => applicationStore.dispatch(reset(undefined));
export const changeClearError = () => applicationStore.dispatch(clearError());

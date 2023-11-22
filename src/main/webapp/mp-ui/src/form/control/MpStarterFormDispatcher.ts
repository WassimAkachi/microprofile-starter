import applicationStore from "../../redux/control/ApplicationStore.ts";
import {clearError, reset, setArtifactId, setGroupId} from "../entity/MpStarterFormStoreSlice.ts";

export const changeGroupId = (value: string) => applicationStore.dispatch(setGroupId(value));
export const changeArtifactId = (value: string) => applicationStore.dispatch(setArtifactId(value));
export const changeReset = () => applicationStore.dispatch(reset(undefined));
export const changeClearError = () => applicationStore.dispatch(clearError());

import applicationStore from "../../redux/control/ApplicationStore.ts";
import {BackendConfiguration} from "../entity/ConfigurationState.ts";
import {clearError, reset, setBackendConfiguration} from "../entity/ConfigurationStoreSlice.ts";

export const changeBackendConfiguration = (value: BackendConfiguration) => applicationStore.dispatch(setBackendConfiguration(value));
export const changeReset = () => applicationStore.dispatch(reset(undefined));
export const changeClearError = () => applicationStore.dispatch(clearError());

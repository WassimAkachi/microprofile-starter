import applicationStore from "../../redux/control/ApplicationStore.ts";
import {setSupportMatrix, setSupportMatrixServers} from "../entity/MpStarterBackendStoreSlice.ts";
import {SupportMatrix, SupportMatrixServers} from "../entity/Entities.ts";


export const changeSupportMatrix = (supportMatrix: SupportMatrix) => applicationStore.dispatch(setSupportMatrix(supportMatrix));

export const changeSupportMatrixServers = (supportMatrixServers: SupportMatrixServers) => applicationStore.dispatch(setSupportMatrixServers(supportMatrixServers));
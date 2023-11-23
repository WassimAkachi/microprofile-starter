import {ReduxStateHolder} from "../../redux/entity/ReduxStateHolder.ts";
import {SupportMatrix, SupportMatrixServers} from "./Entities.ts";

export interface MpStarterBackendConfiguration {
    supportMatrix?: SupportMatrix
    supportMatrixServers?: SupportMatrixServers
}

export interface MpStarterBackendState extends ReduxStateHolder<MpStarterBackendConfiguration> {
}
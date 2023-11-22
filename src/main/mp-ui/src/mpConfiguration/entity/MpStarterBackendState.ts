import {ReduxStateHolder} from "../../redux/entity/ReduxStateHolder.ts";
import {SupportMatrix} from "./Entities.ts";

export interface MpStarterBackendConfiguration {
    supportMatrix?: SupportMatrix
}

export interface MpStarterBackendState extends ReduxStateHolder<MpStarterBackendConfiguration> {
}
import {ReduxStateHolder} from "../../redux/entity/ReduxStateHolder.ts";

export interface MpStarterProject {
    groupId?: string,
    artifactId?: string,
    mpVersion?: string,
    javaVersion?: string
}


export interface MpStarterFormState extends ReduxStateHolder<MpStarterProject> {
}
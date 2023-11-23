import {ReduxStateHolder} from "../../redux/entity/ReduxStateHolder.ts";

export interface MpStarterProject {
    groupId?: string,
    artifactId?: string,
    mpVersion?: string,
    mpRuntime?: string,
    javaVersion?: string
    buildTool?: string
    mpSpecs?: string[]
}


export interface MpStarterFormState extends ReduxStateHolder<MpStarterProject> {
}
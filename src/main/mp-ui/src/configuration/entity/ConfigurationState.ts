import {ReduxStateHolder} from "../../redux/entity/ReduxStateHolder.ts";

export interface EndPoints {
    [key: string]: string
}

export interface BackendConfiguration {
    baseUrl: string,
    endPoints: EndPoints
}

export interface Configuration {
    backendConfiguration?: BackendConfiguration
}

export interface ConfigurationState extends ReduxStateHolder<Configuration> {
}
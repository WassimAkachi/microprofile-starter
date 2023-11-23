export interface MPOptionsAvailable {
    supportedServers: string[]
    specs: string[]
    specCodes: string[]
}

export interface MPOptionsAvailableMap {
    [key: string]: MPOptionsAvailable
}

export interface SpecsDescriptions {
    [key: string]: string
}

export interface SupportMatrix {
    configs: MPOptionsAvailableMap
    descriptions: SpecsDescriptions
}

export interface SupportMatrixServers {
    configs: ServerConfigs
    descriptions: SpecsDescriptions
}

export interface ServerConfigs {
    [key: string]: MpOptionsAvailableServer[]
}

export interface MpOptionsAvailableServer {
    buildTools: string[]
    javaSEVersions: string[]
    mpSpecs: string[]
    mpVersion: string
}

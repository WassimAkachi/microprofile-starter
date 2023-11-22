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
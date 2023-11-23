import {
    readArtifactId,
    readBuildTool,
    readGroupId,
    readJavaVersion,
    readMpSpecs,
    readMpVersionId,
    readRuntimeVersion
} from "./MpStarterFormStateReader.ts";
import {readMpVersion} from "../../mpConfiguration/control/MpStarterBackendStateReader.ts";
import {MpStarterFormState} from "../entity/MpStarterFormState.ts";
import {MpStarterBackendConfiguration} from "../../mpConfiguration/entity/MpStarterBackendState.ts";


export const gestSpec = (mpStarterFormState?: MpStarterFormState, mpStarterBackendConfiguration?: MpStarterBackendConfiguration) => {
    const mpVersionId = readMpVersionId(mpStarterFormState)
    console.debug({mpVersionId})
    if (mpVersionId == undefined || mpVersionId.length < 1) {
        return undefined;
    }

    const mpVersion = readMpVersion(mpVersionId, mpStarterBackendConfiguration)
    console.debug({mpVersion})
    if (mpVersion == undefined) {
        return;
    }

    return mpVersion;
}

export const getProjectQueryParameters = (mpStarterFormState?: MpStarterFormState): Record<string, any> | undefined => {
    if (mpStarterFormState == undefined) {
        return undefined;
    }

    const result = {
        'supportedServer': readRuntimeVersion(mpStarterFormState)!,
        'groupId': readGroupId(mpStarterFormState)!,
        'artifactId': readArtifactId(mpStarterFormState)!,
        'mpVersion': readMpVersionId(mpStarterFormState)!,
        'javaSEVersion': readJavaVersion(mpStarterFormState)!,
        'buildTool': readBuildTool(mpStarterFormState)!,
        'selectedSpecs': readMpSpecs(mpStarterFormState)
    } as Record<string, any>;

    for (const property in result) {
        if (result[property] == undefined) {
            return undefined;
        }
    }

    return result;
}
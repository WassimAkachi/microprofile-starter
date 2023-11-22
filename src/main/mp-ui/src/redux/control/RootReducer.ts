import {mpStarterFormSliceName} from "../../form/entity/MpStarterFormConstants.ts";
import {default as mpStarterFormReducer} from "../../form/entity/MpStarterFormStoreSlice.ts";
import {configurationSliceName} from "../../configuration/entity/ConfigurationConstants.ts";
import {default as configurationReducer} from "../../configuration/entity/ConfigurationStoreSlice.ts";
import {mpStarterBackendStateSliceName} from "../../mpConfiguration/entity/MpStarterBackendConfigurationConstants.ts";
import {default as mpStarterBackendSlice} from "../../mpConfiguration/entity/MpStarterBackendStoreSlice.ts";

const rootReducer = {
    [mpStarterFormSliceName]: mpStarterFormReducer,
    [configurationSliceName]: configurationReducer,
    [mpStarterBackendStateSliceName]: mpStarterBackendSlice
};

export default rootReducer;
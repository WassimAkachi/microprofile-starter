import {mpStarterFormSliceName} from "../../form/entity/MpStarterFormConstants.ts";
import {default as mpStarterFormReducer} from "../../form/entity/MpStarterFormStoreSlice.ts";

const rootReducer = {
    [mpStarterFormSliceName]: mpStarterFormReducer
};

export default rootReducer;
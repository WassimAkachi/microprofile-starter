import "./ComponentsAndElements.ts";
import configurationService from "./configuration/control/ConfigurationService.ts";

configurationService.consumeBackendConfiguration(_ => console.debug("")).then()

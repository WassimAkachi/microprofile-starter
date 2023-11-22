import {appName, appRootUrl, appVersion} from "../entity/app-config";

const holder = {
  data: {
    applicationName: appName(),
    applicationVersion: appVersion(),
    applicationRootUrl: appRootUrl()
  }
};

class ConfigurationService {

  get applicationName() {
    return holder.data.applicationName;
  }

  get applicationVersion() {
    return holder.data.applicationVersion;
  }

}

const configurationService = new ConfigurationService();

export default configurationService
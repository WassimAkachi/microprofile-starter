import {KeycloakConfig, KeycloakInitOptions} from "keycloak-js";
import {oidcClientId, oidcKeycloakRealm, oidcKeycloakRootUrl} from "../entity/oidc-keycloak-config.ts";
import {appRootUrl} from "../entity/app-config.ts";

export const getOidcConfiguration = () => ({
  "url": oidcKeycloakRootUrl(),
  "realm": oidcKeycloakRealm(),
  "clientId": oidcClientId()
} as KeycloakConfig);

export const getOidcInitOptions = () => ({
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: appRootUrl() + '/silent-check-sso.html',
  pkceMethod: 'S256'
} as KeycloakInitOptions);

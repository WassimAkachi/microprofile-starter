// Keycloak Root-URL
let _oidcKeycloakRootUrl = "";
export const oidcKeycloakRootUrl = () => {
  return _oidcKeycloakRootUrl;
}
_oidcKeycloakRootUrl = "http://t12s-oidc-keycloak:28084"; // default (local)

// Keycloak Realm
let _oidcKeycloakRealm = "";
export const oidcKeycloakRealm = () => {
  return _oidcKeycloakRealm;
}
_oidcKeycloakRealm = "blogq"; // default (local)

// Client-ID
let _oidcClientId = "";
export const oidcClientId = () => {
  return _oidcClientId;
}
_oidcClientId = "blogq-web-ui-editor"; // default (local)


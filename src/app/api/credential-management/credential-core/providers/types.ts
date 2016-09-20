export interface CredentialProvider{
  getCredentials();
  login(object);
  autologin(object);
  storeCredentials(object);
}

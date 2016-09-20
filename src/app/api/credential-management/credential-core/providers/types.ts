export interface CredentialProvider{
  getCredentials();
  login(object);
  storeCredentials(object);
}

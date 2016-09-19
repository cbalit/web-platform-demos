export interface CredentialManagementService {

}

export interface Credentials{
  get(object);
  store(object);
  requireUserMediation();
}


export interface PasswordCredential {}

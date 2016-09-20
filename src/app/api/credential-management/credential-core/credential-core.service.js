var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/observable/fromPromise');
require('rxjs/add/observable/timer');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
var CredentialCoreService = (function () {
    function CredentialCoreService(_webCred) {
        this._webCred = _webCred;
        this.GOOGLE_SIGNIN = 'https://accounts.google.com';
        this.FACEBOOK_LOGIN = 'https://www.facebook.com';
        this.cred = _webCred.getCredentials();
    }
    CredentialCoreService.prototype.hasCredentialEnable = function () {
        return !!this.cred;
    };
    CredentialCoreService.prototype.getCredentials = function () {
        return this.cred.get({
            password: true
        });
    };
    CredentialCoreService.prototype.getFederateCredentials = function () {
        return this.cred.get({
            federated: {
                providers: [
                    this.GOOGLE_SIGNIN,
                    this.FACEBOOK_LOGIN
                ]
            }
        });
    };
    CredentialCoreService.prototype.passwordSignIn = function (cred, serverSignIn) {
        return fetch('/auth/password', {
            method: 'POST',
            // Include the credential object as `credentials`
            credentials: cred
        }).then(function (res) {
            // Convert JSON string to an object
            if (res.status === 200) {
                return res.json();
            }
            else {
                return Promise.reject();
            }
        }).then(app.signedIn);
    };
    CredentialCoreService.prototype.storeCredentials = function (form) {
        var cred = new window.PasswordCredential(form);
        return this.cred.store(cred);
    };
    CredentialCoreService.prototype.logout = function () {
        this.cred.requireUserMediation();
    };
    CredentialCoreService = __decorate([
        core_1.Injectable()
    ], CredentialCoreService);
    return CredentialCoreService;
})();
exports.CredentialCoreService = CredentialCoreService;
//# sourceMappingURL=credential-core.service.js.map
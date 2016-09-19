  import { RouterModule, Routes } from '@angular/router';
import { provideRouter, RouterConfig } from '@angular/router';
import { FeatureComponent } from './+feature/';
import { HomeComponent } from './+home/';
import { WebBluetoothComponent } from './api/';
import { CredentialManagementComponent } from './api/';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'feature', component: FeatureComponent, children: [
    { path: 'web-bluetooth', component: WebBluetoothComponent },
    { path: 'credential-management', component: CredentialManagementComponent }
  ]}
];

export const AppRouterModule = RouterModule.forRoot(ROUTES, {useHash: true});

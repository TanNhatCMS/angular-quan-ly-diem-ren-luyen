import { Routes } from '@angular/router';
import {NotFoundComponent} from './common/not-found/not-found.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {SignInComponent} from './authentication/sign-in/sign-in.component';
import {SignUpComponent} from './authentication/sign-up/sign-up.component';
import {LogoutComponent} from './authentication/logout/logout.component';

export const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationComponent,
    children: [
      {path: '', component: SignInComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'logout', component: LogoutComponent}
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {animation: 'Left-Right'},
  }
];

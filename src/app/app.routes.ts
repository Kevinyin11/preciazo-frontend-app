import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Lists } from './pages/lists/lists';
import { Compare } from './pages/compare/compare';
import { Route } from './pages/route/route';
import { Verification } from './pages/verification/verification';
import { Merchant } from './pages/merchant/merchant';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'lists', component: Lists },
  { path: 'compare', component: Compare },
  { path: 'route', component: Route },
  { path: 'verification', component: Verification },
  { path: 'merchant', component: Merchant },
  { path: '**', redirectTo: 'login' },
];

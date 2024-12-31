import { Routes } from '@angular/router';
import { routeGuard } from './route.guard';
import { authResolver } from './auth.resolver';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../components/home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'about',
        loadComponent: () => import('../components/about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('../components/login/login.component').then(m => m.LoginComponent),
        canActivate: [routeGuard]
    },
    {
        path: 'signup',
        loadComponent: () => import('../components/signup/signup.component').then(m => m.SignupComponent),
        canActivate: [routeGuard]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('../components/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [routeGuard],
        resolve: {auth: authResolver}
    },
    {
        path: '**',
        loadComponent: () => import('../components/page-not-found/pnf.component').then(m => m.PageNotFoundComponent)
    }
];

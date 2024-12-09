import { inject } from '@angular/core';
import { CanActivateFn, Router, } from '@angular/router';
import { AuthService } from './services/auth.service';

export const DashboardGuard: CanActivateFn = () => {
  const router = inject(Router)
  const auth = inject(AuthService)
  if (auth.isAuthorized()) return true
  auth.removeUserInfo()
  auth.isAuthorized.set(false)
  router.navigate(['/login']);
  return false;
}

export const SignupOrLogin: CanActivateFn = () => {
  const router = inject(Router)
  const auth = inject(AuthService)
  if (auth.isAuthorized()) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
}
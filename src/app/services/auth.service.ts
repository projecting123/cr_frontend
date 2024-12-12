import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from './form.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { UtilityService } from './utility.service';
import { Subject } from 'rxjs';

/**
 * The main authentication service by which all auth related tasks are performed in this application.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  router = inject(Router)
  fs = inject(FormService)
  utilService = inject(UtilityService)
  document = inject(DOCUMENT)
  platformId = inject(PLATFORM_ID)
  isAuthorized = signal<boolean>(false)
  isEmailVerified = signal(false)
  isSubmittingForm = new Subject<boolean>()
  constructor(private http: HttpClient) {
    if(isPlatformBrowser(this.platformId)){
      if(this.document.cookie.split('=')[0]){
        this.isAuthorized.set(true)
      }
      else{
        localStorage.removeItem('userInfo')
      }
    }
  }

  /**
   * Signup the user to the application
   */
  signup() {
    this.isSubmittingForm.next(true)
    if (!navigator.onLine) {
      this.isSubmittingForm.next(false)
      return this.utilService.openSnackBar("Internet isn't available.", "#FF2929", "#FFF")
    }
    const res = this.http.post('http://localhost:4000/auth/signup', { name: this.fs.formData().get('name')?.value, email: this.fs.formData().get('email')?.value, password: this.fs.formData().get('password')?.value }, { withCredentials: true })
    res.subscribe({
      next: (res: any) => {
        this.fs.formData().reset()
        this.fs.removeFocusClasses()
        this.utilService.openSnackBar(res.message)
        this.isSubmittingForm.next(false)
      },
      error: () => {
        this.fs.formData().reset()
        this.fs.removeFocusClasses()
        this.isSubmittingForm.next(false)
        this.utilService.openSnackBar('Some error occurred', "#FF2929", "#FFF")
      }
    })
  }

  // frontend tells backend, "I'll accept cookies or any such info from you" by withCredentials property in Angular.
  /**
   * Login the user to the application
   */
  login() {
    this.isSubmittingForm.next(true)
    if (!navigator.onLine) {
      this.isSubmittingForm.next(false)
      return this.utilService.openSnackBar("Internet isn't available", "#FF2929", "#FFF")
    }
    const res = this.http.post('http://localhost:4000/auth/login', { email: this.fs.formData().get('email')?.value, password: this.fs.formData().get('password')?.value }, { withCredentials: true })
    res.subscribe({
      next: (res: any) => {
        if (res.isLoggedIn) {
          this.isAuthorized.set(true)
          localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
          this.router.navigate(['dashboard'])
        }
        else {
          this.utilService.openSnackBar(res.message)
          this.fs.formData().reset()
          this.fs.removeFocusClasses()
        }
        this.isSubmittingForm.next(false)
      },
      error: () => {
        this.fs.formData().reset()
        this.fs.removeFocusClasses()
        this.isSubmittingForm.next(false)
        this.utilService.openSnackBar('Some error occurred', "#FF2929", "#FFF")
      }
    })
  }

  /**
   * Logout the user from the application
   */
  logout() {
    const response = this.http.get('http://localhost:4000/auth/logout', { withCredentials: true })
    response.subscribe(() => {
      this.removeUserInfo()
      this.isAuthorized.set(false)
      this.router.navigate(['/login'])
    })
  }

  /**
   * 
   * @param userId Id of the user for which email is to be verified.
   * @returns Observable
   */
  verifyEmail(userId: string) {
    return this.http.post('http://localhost:4000/auth/send-email', { userId: userId }, { withCredentials: true })
  }

  /**
   * 
   * @param email Email of the user for which email is to be sent
   * @returns observable
   */
  sendVerificationEmail(email: string) {
    return this.http.post('http://localhost:4000/auth/send-verification-email', { email: email }, { withCredentials: true })
  }

  /**
   * 
   * @returns user info in JSON format or null
   */
  getUserInfo() {
    if (this.document.cookie.split('=')[0]) return JSON.parse(localStorage.getItem('userInfo')!)
    return null
  }

  /**
   * This function removes user info from localStorage once the user is logged out.
   */
  removeUserInfo() {
    if(isPlatformBrowser(this.platformId)){
      if (!this.document.cookie.split('=')[0]) localStorage.removeItem('userInfo')
    }
  }
}
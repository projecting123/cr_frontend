import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable, Output, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from './form.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { UtilityService } from './utility.service';
import { Observable, Subject } from 'rxjs';

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
  submittingEvent = new Subject()
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

  signup() {
    this.submittingEvent.next(true)
    if (!navigator.onLine) {
      this.submittingEvent.next(false)
      return this.utilService.openSnackBar("Internet isn't available.", "#FF2929", "#FFF")
    }
    const res = this.http.post('http://localhost:4000/auth/signup', { name: this.fs.formData().get('name')?.value, email: this.fs.formData().get('email')?.value, password: this.fs.formData().get('password')?.value }, { withCredentials: true })
    res.subscribe({
      next: (res: any) => {
        this.fs.formData().reset()
        this.fs.removeFocusClasses()
        this.utilService.openSnackBar(res.message)
        this.submittingEvent.next(false)
      },
      error: () => {
        this.fs.formData().reset()
        this.fs.removeFocusClasses()
        this.submittingEvent.next(false)
        this.utilService.openSnackBar('Some error occurred', "#FF2929", "#FFF")
      }
    })
  }

  // frontend tells backend, "I'll accept cookies or any such info from you" by withCredentials property in Angular.
  login() {
    this.submittingEvent.next(true)
    if (!navigator.onLine) {
      this.submittingEvent.next(false)
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
        this.submittingEvent.next(false)
      },
      error: () => {
        this.fs.formData().reset()
        this.fs.removeFocusClasses()
        this.submittingEvent.next(false)
        this.utilService.openSnackBar('Some error occurred', "#FF2929", "#FFF")
      }
    })
  }

  logout() {
    const response = this.http.get('http://localhost:4000/auth/logout', { withCredentials: true })
    response.subscribe(() => {
      this.removeUserInfo()
      this.isAuthorized.set(false)
      this.router.navigate(['/login'])
    })
  }

  verifyEmail(userId: string) {
    return this.http.post('http://localhost:4000/auth/send-email', { userId: userId }, { withCredentials: true })
  }

  sendVerificationEmail(email: string) {
    return this.http.post('http://localhost:4000/auth/send-verification-email', { email: email }, { withCredentials: true })
  }

  getUserInfo() {
    if (this.document.cookie.split('=')[0]) return JSON.parse(localStorage.getItem('userInfo')!)
    return null
  }

  removeUserInfo() {
    if(isPlatformBrowser(this.platformId)){
      if (!this.document.cookie.split('=')[0]) localStorage.removeItem('userInfo')
    }
  }
}
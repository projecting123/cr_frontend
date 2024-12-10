import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class settings {
  platformId = inject(PLATFORM_ID)
  constructor() {
  }

  toggleDarkMode() {
    if(isPlatformBrowser(this.platformId)){
      localStorage.getItem('isDarkMode') == null && localStorage.setItem('isDarkMode', `${true}`)
      localStorage.setItem('isDarkMode', `${!Boolean(localStorage.getItem('isDarkMode'))}`)
    }
  }

  get isDarkMode(): boolean{
    localStorage.getItem('isDarkMode') == null && false
    if(localStorage.getItem('isDarkMode') == 'true') return true
    else return false
  }

  openSidebar(sidebar: HTMLDivElement){
    sidebar.style.transform = 'translateX(0%)'
  }

  closeSidebar(sidebar: HTMLDivElement){
    sidebar.style.transform = 'translateX(-100%)'
  }
}

// It is settings related service that'll be used for authorized users
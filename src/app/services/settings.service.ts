import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  platformId = inject(PLATFORM_ID)
  constructor() {
  }

  /**
   * Toggle dark mode in the application
   */
  toggleDarkMode() {
    if(isPlatformBrowser(this.platformId)){
      localStorage.getItem('isDarkMode') == null ? localStorage.setItem('isDarkMode', `true`) :
      localStorage.getItem('isDarkMode') == 'false' ? localStorage.setItem('isDarkMode', `true`) :
      localStorage.setItem('isDarkMode', `false`)
    }
  }

  /**
   * Get dark mode status
   * @returns true if dark mode is enabled otherwise false
   */
  get isDarkMode(): boolean{
    localStorage.getItem('isDarkMode') == null && false
    if(localStorage.getItem('isDarkMode') == 'true') return true
    else return false
  }

  /**
   * This function opens the sidebar
   * @param sidebar The sidebar element which is a HTMLDivElement
   */
  openSidebar(sidebar: HTMLDivElement){
    sidebar.style.transform = 'translateX(0%)'
  }

  /**
   * This function closes the sidebar
   * @param sidebar The sidebar element which is a HTMLDivElement
   */
  closeSidebar(sidebar: HTMLDivElement){
    sidebar.style.transform = 'translateX(-100%)'
  }
}
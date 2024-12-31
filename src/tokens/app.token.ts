// create an injection token
import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken, PLATFORM_ID, REQUEST } from '@angular/core';

export const CR_APP_CONFIG = new InjectionToken('app.config', {
  providedIn: 'root',
  factory: () => {
    const platform = inject(PLATFORM_ID);
    const request = inject(REQUEST);
    const doc = inject(DOCUMENT);
    const isServer = platform === 'server';
    const documentObj = platform === 'server' ? doc : document;
    const requestObj = platform === 'server' ? request : null;
    /**
     * Finds the value of the given cookie name from the browser's document object.
     * @param cookieName The name of the cookie to find.
     * @returns The value of the cookie if found, or undefined if not.
     */
    const findCookieFromBrowser = (cookieName: string): string | undefined => {
        const value = document.cookie
          .split(';')
          .find((cookie) => cookie.trim().startsWith(cookieName))
          ?.split('=')[1];
        return value ? value : undefined;
      }
    return { isServer, documentObj, requestObj, findCookieFromBrowser };
  },
});

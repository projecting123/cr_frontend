// create a custom css config token
import { inject, InjectionToken } from '@angular/core';
import { CR_APP_CONFIG } from './app.token';

export const CR_CSS_CONFIG = new InjectionToken('custom.css.config', {
  providedIn: 'root',
  factory: () => {
    const ripple_targetEl_CSS_Rule = `
        .ripple_targetEl {
              display: inline-block;
              position: relative;
              overflow: hidden;
              text-decoration: none;
              cursor: pointer;
              color: rgb(0, 92, 187);
              padding: 0.7rem 1rem;
              border-radius: 50px;
              transition: all 0.1s ease-in-out;
              }
              
        .ripple_targetEl:hover {
              background-color: rgba(0, 92, 187, 0.1);
              }
        `;

        return {ripple_targetEl_CSS_Rule};
  },
});

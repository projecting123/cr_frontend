import { InjectionToken } from '@angular/core';
export const CR_CSS_CONFIG = new InjectionToken('custom.css.config', {
  providedIn: 'root',
  factory: () => {
    const ripple_targetEl_CSS_Rule = `
        .ripple_targetEl {
              display: inline-flex;
              align-items: center;
              position: relative;
              overflow: hidden;
              text-decoration: none;
              cursor: pointer;
              color: rgb(0, 92, 187);
              padding: 0.6rem 1rem;
              border-radius: 50px;
              transition: all 0.1s ease-in-out;
              }
              
        .ripple_targetEl:hover {
              background-color: rgba(0, 92, 187, 0.15);
              }
        `;

        return {ripple_targetEl_CSS_Rule};
  },
});

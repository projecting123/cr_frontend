import { animate, style, transition, trigger } from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.2s ease-in-out', style({ opacity: 1 })),
  ]),
]);
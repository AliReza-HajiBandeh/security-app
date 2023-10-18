import { trigger, transition, style, query, state, animate, group, animateChild } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// export const routeAnimations = trigger('routeAnimations', [
//   transition('* <=> *', [
//     style({ opacity: 0 }),
//     query(':enter, :leave', [
//       style({
//         opacity: '0',
//       })
//     ]),
//     query(':enter', [style({ opacity: 1 })]),
//     query(':leave', animateChild()),
//     group([
//       query(':leave', [animate('1s ease-out', style({ opacity: 0 }))]),
//       query(':enter', [animate('1s ease-out', style({ opacity: 1 }))])
//     ]),
//     query(':enter', animateChild())
//   ]),
// ]);

// export const fadeAnimation = trigger('routeAnimations', [
//   transition('* => *', [
//     query(':enter',
//       [
//         style({ opacity: 0 })
//       ],
//       { optional: true }
//     ),
//     query(':leave',
//       [
//         style({ opacity: 1 }),
//         animate('0.2s', style({ opacity: 0 }))
//       ],
//       { optional: true }
//     ),
//     query(':enter',
//       [
//         style({ opacity: 0 }),
//         animate('0.2s', style({ opacity: 1 }))
//       ],
//       { optional: true }
//     )
//   ])
// ]);

@Component({
  selector: 'app-workspace-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.less'],
  // animations: [fadeAnimation]
})
export class AccessComponent {
  constructor() {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.id;
  }
}

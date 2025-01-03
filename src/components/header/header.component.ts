import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { NavlinkDirective } from '../../directives/navlink.directive';

@Component({
  selector: 'cr-header',
  imports: [RouterLink, RouterLinkActive, NavlinkDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private readonly subscription: Subscription = new Subscription();
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly isAuthorized = signal<boolean>(false);
  ngOnInit(): void {
    const authSubscription = this.auth.isAuthorizedSubject.subscribe((value: any) => this.isAuthorized.set(value));
    this.subscription.add(authSubscription);
  }
  logout() {
    const response = this.auth.logout();
    const logoutSubscription = response.subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
    this.subscription.add(logoutSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
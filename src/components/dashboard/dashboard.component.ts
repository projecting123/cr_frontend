import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../reusable/components/sidebar/sidebar.component';
import { CR_APP_CONFIG } from '../../tokens/app.token';
import { firstValueFrom } from 'rxjs';
import { TransferStateService } from '../../services/transferstate.service';
@Component({
  selector: 'cr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [SidebarComponent, RouterOutlet],
})
export class DashboardComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly app = inject(CR_APP_CONFIG);
  readonly ts = inject(TransferStateService);
  async ngOnInit() {
    if (this.app.isServer) {
      const res = await firstValueFrom(this.route.data);
      this.ts.setUser(this.ts.authUserInfoKey, res['auth']);
    }
  }
}

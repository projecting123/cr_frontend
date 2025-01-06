import { Component, inject, signal } from '@angular/core';
import { TransferStateService } from '../../../services/transferstate.service';
import { AuthUserInfo } from '../../../interfaces/auth';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CR_APP_CONFIG } from '../../../tokens/app.token';

@Component({
  selector: 'cr-index-dash',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexPage {
  readonly user = signal<null | AuthUserInfo>(null);
  private readonly ts = inject(TransferStateService);
  private readonly route = inject(ActivatedRoute);
  private readonly app = inject(CR_APP_CONFIG);
  async ngOnInit() {
    if (this.app.isServer) {
      const res = await firstValueFrom(this.route.data);
      this.user.set(res['auth']);
    } else {
      const user = this.ts.getUser(this.ts.authUserInfoKey);
      this.user.set(user);
    }
  }
}

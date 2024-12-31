import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthUserInfo } from '../../interfaces/auth';
import { CR_APP_CONFIG } from '../../tokens/app.token';

@Component({
  selector: 'cr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{
  private readonly route = inject(ActivatedRoute);
  private readonly app = inject(CR_APP_CONFIG);
  readonly authUserInfo = signal<null | AuthUserInfo>(null)
  private readonly subscription: Subscription = new Subscription();
  ngOnInit(): void {
    const userInfoSubscription = this.route.data.subscribe(data => {
      if(this.app.isServer) this.authUserInfo.set(data['auth']['user']);
      else{
        if(!localStorage.getItem('userInfo')) localStorage.setItem('userInfo', JSON.stringify(data['auth']['user']))
        else this.authUserInfo.set(JSON.parse(localStorage.getItem('userInfo')!))
      }
    })
    this.subscription.add(userInfoSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
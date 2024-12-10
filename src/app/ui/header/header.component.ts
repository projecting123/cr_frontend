import { Component, inject, Signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { settings } from '../../services/settings.service';
@Component({
  selector: 'cr-header',
  imports: [RouterLink, RouterLinkActive, MatIcon, MatTooltipModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  sidebar: Signal<any> = viewChild('sidebar');
  auth = inject(AuthService)
  settings = inject(settings)
  router = inject(Router)
  constructor() {
  }
}
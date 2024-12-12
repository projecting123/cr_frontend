import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';
@Component({
  selector: 'cr-header',
  imports: [RouterLink, RouterLinkActive, MatIcon, MatTooltipModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  auth = inject(AuthService)
  settings = inject(SettingsService)
  router = inject(Router)
  constructor() {
  }
}
import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  signal,
} from '@angular/core';
import {
  matHomeOutline,
  matNotificationsOutline,
  matSettingsOutline,
  matQuestionMarkOutline,
  matBookOutline,
  matQuizOutline,
  matPictureAsPdfOutline,
} from '@ng-icons/material-icons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CRLinkDirective } from '../../../directives/crlink.directive';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [RouterLink, CRLinkDirective, RouterLinkActive, NgIcon],
  viewProviders: [
    provideIcons({
      matHomeOutline,
      matNotificationsOutline,
      matSettingsOutline,
      matQuestionMarkOutline,
      matBookOutline,
      matQuizOutline,
      matPictureAsPdfOutline,
    }),
  ],
})
export class SidebarComponent {
  private readonly renderer = inject(Renderer2);
  private readonly hostElement = inject(ElementRef);
  private readonly isSidebarOpen = signal(true);
  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen());
    if(this.isSidebarOpen()) this.renderer.removeClass(this.hostElement.nativeElement, 'closed');
    else this.renderer.addClass(this.hostElement.nativeElement, 'closed');
  }
}

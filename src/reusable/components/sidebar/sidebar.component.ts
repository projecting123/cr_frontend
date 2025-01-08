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
  matArrowCircleRightOutline,
  matArrowCircleLeftOutline,
} from '@ng-icons/material-icons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CRLinkDirective } from '../../../directives/crlink.directive';
import { sidebarAnimation } from '../../../app/animation';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [RouterLink, CRLinkDirective, RouterLinkActive, NgIcon, NgIf, NgClass],
  viewProviders: [
    provideIcons({
      matHomeOutline,
      matNotificationsOutline,
      matSettingsOutline,
      matQuestionMarkOutline,
      matBookOutline,
      matQuizOutline,
      matPictureAsPdfOutline,
      matArrowCircleRightOutline,
      matArrowCircleLeftOutline,
    }),
  ],

  host: {
    '[class]': 'isExpanded() ? "expanded" : ""',
    '[@sidebarAnimation]': 'isExpanded() ? "expanded" : "collapsed"',
  },
  animations: [sidebarAnimation],
})
export class SidebarComponent{
  private readonly renderer = inject(Renderer2);
  private readonly hostElement = inject(ElementRef);
  readonly isExpanded = signal(false);
  toggleSidebar() {
    this.isExpanded.set(!this.isExpanded());
  }
}

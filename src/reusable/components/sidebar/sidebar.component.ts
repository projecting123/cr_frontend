import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavlinkDirective } from '../../../directives/navlink.directive';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [RouterLink, NavlinkDirective],
})
export class SidebarComponent {
  private readonly renderer = inject(Renderer2);
  private readonly hostElement = inject(ElementRef);
  readonly isSidebarOpen = signal(true);
  constructor() {}
  ngOnInit() {}
  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen());
    if (!this.isSidebarOpen())
      this.renderer.addClass(this.hostElement.nativeElement, 'closed');
    else this.renderer.removeClass(this.hostElement.nativeElement, 'closed');
  }
}

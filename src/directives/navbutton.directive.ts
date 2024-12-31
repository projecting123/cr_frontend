import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ButtonService } from '../services/button.service';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[navButton]',
})
export class NavButtonDirective implements OnInit, OnDestroy {
  private readonly bs = inject(ButtonService);
  private subscription: Subscription = new Subscription();
  private readonly buttonEl = inject(
    ElementRef
  ) as ElementRef<HTMLButtonElement>;

  constructor() {}

  ngOnInit(): void {
    this.bs.setButtonColor(this.buttonEl.nativeElement, 'navbar');
    const clicks = fromEvent(this.buttonEl.nativeElement, 'click');
    const buttonSubscription = clicks.subscribe((event: any) =>
      this.bs.makeRippleEffect(event)
    );

    this.subscription.add(buttonSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

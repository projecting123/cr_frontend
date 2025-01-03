import {
  Directive,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormService } from '../services/form.service';
import { ButtonService } from '../services/button.service';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[formButton]',
})
export class FormButtonDirective implements OnInit, OnDestroy{
  private readonly fs = inject(FormService);
  private readonly buttonEl = inject(
    ElementRef
  ) as ElementRef<HTMLButtonElement>;
  private readonly bs = inject(ButtonService);
  private subscription: Subscription = new Subscription();

  constructor() {
    effect(() => {
      if (this.fs.isSubmittingForm())
        this.bs.setButtonDisability(this.buttonEl.nativeElement, true);
      else
        this.bs.setButtonDisability(
          this.buttonEl.nativeElement,
          this.fs.currentFormFields().invalid
        );
    });
  }

  ngOnInit() {
    const statusSubscription = this.fs
      .currentFormFields()
      .statusChanges.subscribe((status) => {
          this.bs.setButtonDisability(
            this.buttonEl.nativeElement,
            status == 'INVALID'
          );
      });

    const formSubmit = fromEvent(this.buttonEl.nativeElement, 'click');
    const formSubmitSubscription = formSubmit.subscribe((event: any) => {
      if (this.fs.formType() === 'signup') {
        const signupSubscription = this.fs
          .signup()
          .subscribe(this.fs.signupObserver);
        formSubmitSubscription.add(signupSubscription);
      } else if (this.fs.formType() === 'login') {
        const loginSubscription = this.fs
          .login()
          .subscribe(this.fs.loginObserver);
        formSubmitSubscription.add(loginSubscription);
      }
    });

    this.subscription.add(statusSubscription);
    this.subscription.add(formSubmitSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import {
  Directive,
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
export class FormButtonDirective implements OnInit, OnDestroy {
  private readonly fs = inject(FormService);
  private readonly bs = inject(ButtonService);
  private readonly buttonEl = inject(ElementRef) as ElementRef<HTMLButtonElement>;
  private readonly subscription: Subscription = new Subscription();

  ngOnInit() {
    this.bs.setButtonDisability(
      this.buttonEl.nativeElement,
      this.fs.currentFormFields().invalid
    );

    const subscription = this.fs.isSubmittingForm.subscribe((isSubmitting) => {
      this.bs.setButtonDisability(this.buttonEl.nativeElement, isSubmitting);
    });

    const statusSubscription = this.fs
      .currentFormFields()
      .statusChanges.subscribe((status) => {
        if (status === 'VALID')
          this.bs.setButtonDisability(this.buttonEl.nativeElement, false);
        else this.bs.setButtonDisability(this.buttonEl.nativeElement, true);
      });

    const formSubmit = fromEvent(this.buttonEl.nativeElement, 'click');
    const formSubmitSubscription = formSubmit.subscribe((event: any) => {
      if (this.fs.formType() === 'signup')
        this.fs.signup().subscribe(this.fs.signupObserver);
      else if (this.fs.formType() === 'login')
        this.fs.login().subscribe(this.fs.loginObserver);
    });

    this.subscription.add(subscription);
    this.subscription.add(statusSubscription);
    this.subscription.add(formSubmitSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

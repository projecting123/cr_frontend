import {
  Directive,
  effect,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormService } from '../services/form.service';
import { fromEvent, Subscription } from 'rxjs';
import { ButtonService } from '../services/button.service';

/**
 * This directive modifies defines appearance and functionalities for buttons.
 */
@Directive({
  selector: '[crButton]',
  inputs: ['crButton'],
})
export class ButtonDirective implements OnInit, OnDestroy {
  /**
   * This value tells that a button is normal button or a form button.
   */
  @Input() crButton!: 'form_button' | 'primary';
  private readonly fs = inject(FormService);
  private readonly renderer = inject(Renderer2);
  private readonly buttonEl = inject(
    ElementRef
  ) as ElementRef<HTMLButtonElement>;
  private readonly bs = inject(ButtonService);
  private rippleTimeout!: NodeJS.Timeout;
  private mainSubscription!: Subscription;
  constructor() {
    effect(() => {
      if (this.fs.isSubmittingForm() && this.crButton === 'form_button')
        this.bs.setButtonDisability(this.buttonEl.nativeElement, true);
      else if (!this.fs.isSubmittingForm() && this.crButton === 'form_button')
        this.bs.setButtonDisability(
          this.buttonEl.nativeElement,
          this.fs.currentFormFields().invalid
        );
    });
  }

  ngOnInit() {
    if (this.crButton === 'form_button') {
      
    }

    

    
  }

  ngOnDestroy() {
    clearTimeout(this.rippleTimeout);
    this.crButton == 'form_button' && this.mainSubscription.unsubscribe();
  }
}

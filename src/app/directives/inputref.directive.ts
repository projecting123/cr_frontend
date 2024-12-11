import { Directive, ElementRef, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormService } from '../services/form.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[inputRef]'
})
export class FocusblurDirective implements OnInit, OnDestroy {
  fs = inject(FormService)
  auth = inject(AuthService)
  isSubmittingFormSubscription: Subscription
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.listen(this.el.nativeElement, 'focus', (event: Event) => {
      const inputEl = event.target as HTMLInputElement
      const labelEl = inputEl.nextElementSibling as HTMLLabelElement
      labelEl.classList.add('FOCUSED_OR_FILLED_LABEL')
    })

    this.renderer.listen(this.el.nativeElement, 'blur', (event: Event) => {
      const inputEl = event.target as HTMLInputElement
      const labelEl = inputEl.nextElementSibling as HTMLLabelElement
      const currentInputValue = this.fs.formData().get(inputEl.name)?.value
      if (currentInputValue == '' || currentInputValue == null) {
        labelEl.classList.remove('FOCUSED_OR_FILLED_LABEL')
      }
    })

    this.renderer.listen(this.el.nativeElement, 'keydown', (event: KeyboardEvent) => {
      const inputEl = event.target as HTMLInputElement
      if (inputEl.name !== 'name' && event.code == 'Space') {
        event.preventDefault()
      }
    })

    this.isSubmittingFormSubscription = this.auth.isSubmittingForm.subscribe(value => {
      this.renderer.setProperty(this.el.nativeElement, 'readOnly', value)
    })
  }

  ngOnDestroy(): void {
    this.isSubmittingFormSubscription.unsubscribe()
  }
}

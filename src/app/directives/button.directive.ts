import { Directive, ElementRef, inject, input, InputSignal, Renderer2 } from '@angular/core';
import { FormService } from '../services/form.service';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[buttonRef]'
})
export class ButtonDirective {
  buttonRef: InputSignal<HTMLInputElement | string> = input()
  auth = inject(AuthService)
  fs = inject(FormService)
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    // Functionality for submit buttons
    if (this.buttonRef() == 'SUBMIT_BTN') {
      this.renderer.setProperty(this.el.nativeElement, 'disabled', this.fs.formData().invalid)
      this.renderer.setProperty(this.el.nativeElement, 'textContent', 'Submit')
      this.renderer.addClass(this.el.nativeElement, this.fs.formData().invalid ? 'button_disabled' : 'button_allowed')

      this.fs.formData().statusChanges.subscribe(newStatus => {
        this.renderer.setProperty(this.el.nativeElement, 'disabled', newStatus == 'INVALID' ? true : false)
        this.renderer.removeClass(this.el.nativeElement, newStatus == 'INVALID' ? 'button_allowed' : 'button_disabled')
        this.renderer.addClass(this.el.nativeElement, newStatus == 'INVALID' ? 'button_disabled' : 'button_allowed')
      })


      this.auth.isSubmittingForm.subscribe(value => {
        value && this.renderer.setProperty(this.el.nativeElement, 'disabled', true)
        value && this.renderer.removeClass(this.el.nativeElement, 'button_allowed')
        value && this.renderer.addClass(this.el.nativeElement, 'button_disabled')
        this.renderer.setProperty(this.el.nativeElement, 'textContent', value ? 'Please Wait' : 'Submit')
      })

      this.renderer.listen(this.el.nativeElement, 'click', (event: MouseEvent) => {
        this.fs.formType() == 'signup' ? this.auth.signup() : this.auth.login()
      })
    }

    // Functionality for toggle password showable
    this.buttonRef() instanceof HTMLInputElement && this.renderer.listen(this.el.nativeElement, 'click', () => {
      const inputEl = this.buttonRef() as HTMLInputElement
      inputEl.type = inputEl.type == "password" ? "text" : "password"
    })

    // Ripple button functionality
    if (this.buttonRef() == 'ripple_btn') {
      this.renderer.listen(this.el.nativeElement, 'mousedown', (event: MouseEvent) => {
        this.makeButtonRipple(event)
      })
    }
  }



  /**
   * Creates a ripple effect on the button where the user clicked.
   * @param event The MouseEvent that triggered the click event.
   */
  makeButtonRipple(event: MouseEvent) {
    const buttonEl = event.target as HTMLButtonElement
      const buttonRect = buttonEl.getBoundingClientRect()
      const x = event.clientX - buttonRect.left
      const y = event.clientY - buttonRect.top
      const ripple = this.renderer.createElement('span')
      this.renderer.addClass(ripple, 'ripple')
      this.renderer.setStyle(ripple, 'left', `${x}px`)
      this.renderer.setStyle(ripple, 'top', `${y}px`)
      this.renderer.appendChild(buttonEl, ripple)
      setTimeout(() => {
        this.renderer.removeChild(buttonEl, ripple)
      }, 600)
  }
}

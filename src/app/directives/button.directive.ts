import { Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { FormService } from '../services/form.service';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[buttonRef]'
})
export class ButtonDirective {
  buttonRef = input()
  auth = inject(AuthService)
  fs = inject(FormService)
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
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
    }

    this.renderer.listen(this.el.nativeElement, 'click', () => {
      if (this.buttonRef() == 'SUBMIT_BTN') this.fs.formType() == 'signup' ? this.auth.signup() : this.auth.login()
      else {
        const inputEl = this.buttonRef() as HTMLInputElement
        inputEl.type = inputEl.type == "password" ? "text" : "password"
      }
    })
  }
}

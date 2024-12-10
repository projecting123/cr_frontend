import { Directive, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';
import { FormService } from '../services/form.service';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[inputRef]'
})
export class FocusblurDirective implements OnInit {
  fs = inject(FormService)
  auth = inject(AuthService)
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

    this.auth.submittingEvent.subscribe(value => {
      this.renderer.setProperty(this.el.nativeElement, 'readOnly', value)
    })
  }
}

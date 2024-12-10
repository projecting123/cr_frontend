import { Directive, ElementRef, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormService } from '../services/form.service';

@Directive({
  selector: '[inputContainerFor]'
})
export class FormInputTypeDirective {
  fs = inject(FormService)
  inputContainerFor = input('')
  constructor(private element: TemplateRef<any>, private template: ViewContainerRef, private el: ElementRef) { 
    
  }

  ngOnInit() {
    if(this.fs.formType() == 'signup'){
      if(this.inputContainerFor() == 'name' || this.inputContainerFor() == 'email' || this.inputContainerFor() == 'password' || this.inputContainerFor() == 'confirm_password'){
        this.template.createEmbeddedView(this.element)
      }
    }
    else if(this.fs.formType() == 'login'){
      if(this.inputContainerFor() == 'email' || this.inputContainerFor() == 'password'){
        this.template.createEmbeddedView(this.element)
      }
    }
  }

}

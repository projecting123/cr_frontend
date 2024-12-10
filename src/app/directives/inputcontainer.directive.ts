import { Directive, ElementRef, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormService } from '../services/form.service';

@Directive({
  selector: '[inputContainerFor]'
})
export class FormInputTypeDirective {
  fs = inject(FormService)
  inputContainerFor = input('')
  constructor(private templateRef: TemplateRef<any>, private container: ViewContainerRef, private el: ElementRef) { 
    
  }

  ngOnInit() {
    if(this.fs.formType() == 'signup'){
      if(this.inputContainerFor() == 'name' || this.inputContainerFor() == 'email' || this.inputContainerFor() == 'password' || this.inputContainerFor() == 'confirm_password'){
        this.container.createEmbeddedView(this.templateRef)
      }
      else this.container.clear()
    }
    else if(this.fs.formType() == 'login'){
      if(this.inputContainerFor() == 'email' || this.inputContainerFor() == 'password'){
        this.container.createEmbeddedView(this.templateRef)
      }
      else this.container.clear()
    }
  }

}

import { Directive, ElementRef, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormService } from '../services/form.service';

@Directive({
  selector: '[formInputType]'
})
export class FormInputTypeDirective {
  fs = inject(FormService)
  formInputType = input('')
  constructor(private templateRef: TemplateRef<any>, private container: ViewContainerRef, private el: ElementRef) { 
    
  }

  ngOnInit() {
    if(this.fs.formType() == 'signup'){
      if(this.formInputType() == 'name' || this.formInputType() == 'email' || this.formInputType() == 'password' || this.formInputType() == 'confirm_password'){
        this.container.createEmbeddedView(this.templateRef)
      }
      else this.container.clear()
    }
    else if(this.fs.formType() == 'login'){
      if(this.formInputType() == 'email' || this.formInputType() == 'password'){
        this.container.createEmbeddedView(this.templateRef)
      }
      else this.container.clear()
    }
  }

}

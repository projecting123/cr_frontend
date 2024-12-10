import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { icon } from '../../animation/icon';
import { FormService } from '../../services/form.service';
import { ActivatedRoute } from '@angular/router';
import { FocusblurDirective } from '../../directives/inputref.directive';
import { ButtonDirective } from '../../directives/button.directive';
import { AuthService } from '../../services/auth.service';
import { FormInputTypeDirective } from '../../directives/inputcontainer.directive';
import { EmailPasswordComponent } from "../../shared/email-password/email-password.component";

@Component({
  selector: 'cr-form',
  imports: [ReactiveFormsModule, MatIcon, NgIf, FocusblurDirective, ButtonDirective, FormInputTypeDirective, EmailPasswordComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  animations: [icon],
  encapsulation: ViewEncapsulation.None
})

export class FormComponent {
  fs = inject(FormService)
  auth = inject(AuthService)
  activeRoute = inject(ActivatedRoute)
  constructor() {

  }

  ngOnInit() {
    if (this.activeRoute.snapshot.url[0].path == 'signup') {
      this.fs.formData().reset()
      this.fs.formType.set('signup')
    }
    else if (this.activeRoute.snapshot.url[0].path == 'login') {
      this.fs.formData().reset()
      this.fs.formType.set('login')
    }
  }
}
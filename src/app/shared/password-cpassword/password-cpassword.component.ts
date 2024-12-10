import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ButtonDirective } from '../../directives/button.directive';
import { NgIf } from '@angular/common';
import { FormInputTypeDirective } from '../../directives/inputcontainer.directive';
import { FocusblurDirective } from '../../directives/inputref.directive';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'crpcp-form',
  imports: [MatIcon, ReactiveFormsModule, ButtonDirective, NgIf, FormInputTypeDirective, FocusblurDirective],
  templateUrl: './password-cpassword.component.html',
  styleUrl: './password-cpassword.component.css'
})
export class PasswordCpasswordComponent {
  @Input() form: FormGroup<any>
  fs = inject(FormService)
}

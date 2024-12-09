import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ButtonDirective } from '../../directives/button.directive';
import { NgIf } from '@angular/common';
import { FormService } from '../../services/form.service';
import { FormInputTypeDirective } from '../../directives/formInputType.directive';
import { FocusblurDirective } from '../../directives/focusblur.directive';
import { icon } from '../../animation/icon';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'crep-form',
  imports: [MatIcon, ReactiveFormsModule, ButtonDirective, NgIf, FormInputTypeDirective, FocusblurDirective],
  templateUrl: './email-password.component.html',
  styleUrl: './email-password.component.css',
  animations: [icon]
})
export class EmailPasswordComponent {
  @Input() form: FormGroup<any>
  fs = inject(FormService)
}

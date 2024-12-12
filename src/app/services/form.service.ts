import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../validator';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

/**
 * This service is responsible for handling form related tasks.
 */
@Injectable({
  providedIn: 'root'
})
export class FormService {
  router = inject(Router)
  document = inject(DOCUMENT)
  constructor() { 
  }

  formType = signal<'signup' | 'login'>(null)
  formData = computed<FormGroup>(() => this.formType() === 'signup' ? this.signupFormData : this.loginFormData)

  signupFormData = new FormGroup({
    name: new FormControl("", [Validators.required, CustomValidator.name_space]),
    email: new FormControl("", [Validators.required,, CustomValidator.validateEmail]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), CustomValidator.validatePassword]),
    confirm_password: new FormControl("", [Validators.required, Validators.minLength(6), CustomValidator.validatePassword])
  }, { validators: CustomValidator.parentValidator })

  loginFormData = new FormGroup({
    email: new FormControl('', [Validators.required, CustomValidator.validateEmail]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), CustomValidator.validatePassword])
  })

  /**
   * 
   * @param inputEl The input element whose visibility is to be toggled.
   */
  setPasswordVisibility(inputEl: HTMLInputElement) {
    inputEl.type = inputEl.type == "password" ? "text" : "password"
  }

  /**
   * Removes the focus classes from all the labels in the form.
   */
  removeFocusClasses() {
    const labels = this.document.querySelectorAll('label')
    labels.forEach(label => label.classList.remove('FOCUSED_OR_FILLED_LABEL'))
  }
}

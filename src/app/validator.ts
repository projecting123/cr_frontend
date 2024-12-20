import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class CustomValidator {
    static name_space(control: AbstractControl): ValidationErrors | null {
        const controlValue = control.value as string
        const totalSpaces = controlValue?.split(' ').length - 1
        if (totalSpaces > 2) return { message: "Name can't contains more than two spaces" }
        return null
    }

    static validateEmail(control: AbstractControl): ValidationErrors | null {
        const controlValue = control.value as string
        const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
        if (controlValue?.length && !emailPattern.test(controlValue)) return { message : 'Enter a valid email' }
        return null;
    }

    // Checks password pattern
    static validatePassword(control: AbstractControl): ValidationErrors | null {
        const controlValue = control.value as string
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        if (controlValue?.length > 0 && !passwordPattern.test(controlValue)) return { message: "Password must contain at least one uppercase and lowercase letter, one numeric value and one special character" };
        return null
    }

    // Checked by signupForm FormGroup
    static parentValidator(control: FormGroup): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirm_password')?.value;
        if (password !== confirmPassword){
            control.get('confirm_password')?.setErrors({ passwordMismatch: true})
            return { passwordMismatch: true }
        }
        else if(password && confirmPassword && password == confirmPassword){
            control.get('confirm_password')?.setErrors(null)
        }
        return null;
    }
}
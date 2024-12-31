import { Component, inject, Input, input, InputSignal } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from '../../../directives/input.directive';

@Component({
    selector: 'cr-ep-form',
    imports: [ReactiveFormsModule, InputDirective],
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent {
    @Input() form!: FormGroup<any>
    fs = inject(FormService)
}
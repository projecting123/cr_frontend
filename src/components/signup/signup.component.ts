import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormService } from '../../services/form.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormComponent } from '../../shared/components/email-pass/form.componet';
import { ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from '../../directives/input.directive';
import { FormButtonDirective } from '../../directives/formbutton.directive';

@Component({
  selector: 'cr-signup',
  imports: [
    FormComponent,
    ReactiveFormsModule,
    FormButtonDirective,
    InputDirective,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  readonly fs = inject(FormService);
  private readonly route = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    const pathSubscription = this.route.url.subscribe((url) => {
      this.fs.formType.set(url[0].path);
      this.fs.currentFormFields().reset();
    });
    this.subscription.add(pathSubscription);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

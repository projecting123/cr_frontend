import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form.service';
import { Subscription } from 'rxjs';
import { FormComponent } from '../../shared/components/email-pass/form.componet';
import { ReactiveFormsModule } from '@angular/forms';
import { FormButtonDirective } from '../../directives/formbutton.directive';

@Component({
  selector: 'cr-login',
  imports: [ReactiveFormsModule, FormComponent, FormButtonDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  private readonly subscription: Subscription = new Subscription();
  readonly fs = inject(FormService);
  private readonly route = inject(ActivatedRoute);
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

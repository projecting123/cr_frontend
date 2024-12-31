// create a page not found component
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'cr-pnf',
  templateUrl: './pnf.component.html',
  imports: [RouterLink],
  styleUrls: ['./pnf.component.css']
})
export class PageNotFoundComponent {
  title = 'Page Not Found';
  readonly auth = inject(AuthService);
}
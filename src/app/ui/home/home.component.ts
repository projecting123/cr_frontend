import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from "../card/card.component";
import { ButtonDirective } from '../../directives/button.directive';
@Component({
    selector: 'cr-home',
    imports: [MatButtonModule, MatIconModule, CardComponent, ButtonDirective],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    
}

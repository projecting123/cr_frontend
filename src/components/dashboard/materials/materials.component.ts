import { Component } from '@angular/core';
import { routeAnimation } from '../../../app/animation';

@Component({
  selector: 'cr-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css'],
  host: { '[@routeAnimation]': '' },
  animations: [routeAnimation],
})
export class MaterialsPage {}

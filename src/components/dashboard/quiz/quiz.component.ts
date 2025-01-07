import { Component } from '@angular/core';
import { routeAnimation } from '../../../app/animation';
@Component({
  selector: 'cr-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  host: { '[@routeAnimation]': '' },
  animations: [routeAnimation],
})
export class QuizPage {}

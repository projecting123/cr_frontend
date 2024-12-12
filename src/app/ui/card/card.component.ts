import { Component, Input } from '@angular/core';
import { Course } from '../../../interfaces/course';

@Component({
  selector: 'course-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input()
  course: Course = {
    id: 0,
    name: 'Maths Fundamentals',
    description: 'Improve maths skill with concept',
    image: '',
    price: 1000,
    rating: 4.5,
    reviews: 300,
    enrolled: 10,
    duration: 2,
    language: 'Assamese',
    instructor: 'Ankur Rajbongshi',
    date: new Date
  }
}

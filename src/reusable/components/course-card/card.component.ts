import { Component, Input } from '@angular/core';

@Component({
    selector: 'course-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CourseCardComponent {
    @Input() course: any;
}
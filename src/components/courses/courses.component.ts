import { Component } from '@angular/core';
import { CourseCardComponent } from '../../reusable/components/course-card/card.component';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css'],
    imports: [CourseCardComponent]
})
export class CoursesComponent {}
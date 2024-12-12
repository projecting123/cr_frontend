/**
 * Course interface represents a course object.
 */
export interface Course {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    rating?: number;
    reviews?: number;
    enrolled: number;
    duration: number;
    language: string;
    instructor: string;
    date: Date;
}
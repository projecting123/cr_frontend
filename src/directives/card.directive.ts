import { Directive, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[crCard]',
})
export class CardDirective implements OnInit{
    private readonly hostEl = inject(ElementRef);
    private readonly renderer = inject(Renderer2);
    constructor() {}
    ngOnInit(): void {
        
    }
}
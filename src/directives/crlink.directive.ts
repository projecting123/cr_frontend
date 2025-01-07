import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { CR_CSS_CONFIG } from '../tokens/customcss.token';
import { CR_APP_CONFIG } from '../tokens/app.token';

/**
 * This directive creates ripple effect on click of a link.
 */
@Directive({
  selector: '[crLink]',
})
export class CRLinkDirective implements OnInit, OnDestroy {
  public readonly subscription: Subscription = new Subscription();
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);
  public readonly cssConfig = inject(CR_CSS_CONFIG);
  public readonly appConfig = inject(CR_APP_CONFIG);
  public readonly link = this.el.nativeElement as HTMLElement;
  public readonly ripple_span = this.renderer.createElement('span');

  ngOnInit(): void {
    const alreadyExistStyleEl = this.appConfig.documentObj.head.querySelector(`#cr_ripple_style`)
    if(!alreadyExistStyleEl){
      const style = this.renderer.createElement('style') as HTMLStyleElement;
      style.innerHTML = this.cssConfig.ripple_targetEl_CSS_Rule;
      style.id = 'cr_ripple_style';
      this.appConfig.documentObj.head.appendChild(style);
    }

    this.el.nativeElement.classList.add('ripple_targetEl');
    this.link.appendChild(this.ripple_span);
    const linkMouseDown = fromEvent(this.link, 'mousedown');
    const linkMouseDownSubscription = linkMouseDown.subscribe(e => this.createRipple(e))
    this.subscription.add(linkMouseDownSubscription);
  }

  /**
   * Creates a ripple effect by adding a `span` element to the host element,
   * and adding a CSS rule to the global stylesheet to define the appearance
   * of the ripple effect.
   */
  createRipple(e: any) {
    const alreadyExistRipple = document.querySelector('.ripple_effect');
    if (alreadyExistRipple) alreadyExistRipple.remove();
    const rippleInnerSpan = document.createElement('span');
    this.ripple_span.appendChild(rippleInnerSpan);
    const targetElRect = this.link.getBoundingClientRect();
    const diameter = Math.max(targetElRect.width, targetElRect.height);
    const x = e.clientX - targetElRect.left;
    const y = e.clientY - targetElRect.top;

    rippleInnerSpan.style.position = 'absolute';
    rippleInnerSpan.style.top = `${y}px`;
    rippleInnerSpan.style.left = `${x}px`;
    rippleInnerSpan.style.width = `1px`;
    rippleInnerSpan.style.height = `1px`;
    rippleInnerSpan.style.transition = `all 0.4s ease-in-out`;
    rippleInnerSpan.style.transform = `scale(0)`;
    rippleInnerSpan.style.borderRadius = `50%`;
    rippleInnerSpan.style.backgroundColor = `rgba(0, 92, 187, 0.25)`;

    rippleInnerSpan.classList.add('ripple_effect');
    const scaleTimeout = setTimeout(() => (rippleInnerSpan.style.transform = `scale(${diameter * 2.5})`),1);

    // removing the ripple effect
    const mouseUpEventLink = fromEvent(this.link, 'mouseup');
    const mouseUpSubscription = mouseUpEventLink.subscribe(() => {
      rippleInnerSpan.style.opacity = '0';
      clearTimeout(scaleTimeout);
    });
    this.subscription.add(mouseUpSubscription);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
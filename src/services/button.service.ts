import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ButtonService {
    private readonly renderer!: Renderer2;
    private rippleTimeout!: NodeJS.Timeout;
    constructor(private readonly rendererFactory: RendererFactory2) {
      this.renderer = this.rendererFactory.createRenderer(null, null);
    }
    /**
   * Disables or enables the button based on the form state and the current action.
   * It also adappService or removes a "disabled_btn" class from the button.
   */
  setButtonDisability(element: HTMLButtonElement, isDisabled: boolean) {
    if (isDisabled) {
      this.renderer.addClass(element, 'disabled_btn');
      this.renderer.setProperty(element, 'disabled', true);
    } else {
      this.renderer.removeClass(element, 'disabled_btn');
      this.renderer.setProperty(element, 'disabled', false);
    }
  }

  /**
   * It makes a ripple effect on button click.
   * @param event MouseEvent
   */
  makeRippleEffect(event: any): NodeJS.Timeout {
    const button = event.target as HTMLButtonElement;
    const buttonRect = button.getBoundingClientRect();
    const spanEl = this.renderer.createElement('span');
    this.renderer.addClass(spanEl, 'ripple');
    this.renderer.setStyle(
      spanEl,
      'top',
      `${event.clientY - buttonRect.top}px`
    );
    this.renderer.setStyle(
      spanEl,
      'left',
      `${event.clientX - buttonRect.left}px`
    );
    this.renderer.appendChild(button, spanEl);
    this.rippleTimeout = setTimeout(() => {
      this.renderer.removeChild(button, spanEl);
    }, 500);

    return this.rippleTimeout;
  }

  setButtonColor(element: HTMLButtonElement, colorFor?: 'navbar' | 'form' | 'other') {
    this.renderer.setStyle(element, 'position', 'relative');
        this.renderer.setStyle(
          element,
          'padding',
          '0.5rem 1rem'
        );
        this.renderer.setStyle(element, 'border', 'none');
        this.renderer.setStyle(element, 'overflow', 'hidden');
        this.renderer.setStyle(element, 'outline', 'none');
        colorFor == 'form' && this.renderer.setStyle(
          element,
          'backgroundColor',
          'var(--form_button_color)'
        );
        
        colorFor == 'navbar' && this.renderer.setStyle(
          element,
          'backgroundColor',
          'var(--navbar_button_color)'
        );
        
        colorFor == 'other' && this.renderer.setStyle(
          element,
          'backgroundColor',
          'var(--form_button_color)'
        )
        
        this.renderer.setStyle(element, 'color', 'white');
        this.renderer.setStyle(element, 'borderRadius', '4px');
        this.renderer.setStyle(element, 'cursor', 'pointer');
        this.renderer.setStyle(
          element,
          'transition',
          'all 0.2s ease-in-out'
        );
  }
}
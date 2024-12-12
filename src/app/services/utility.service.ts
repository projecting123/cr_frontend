import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

/**
 * The main utility service by which all utility related tasks are performed in this application.
 */
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  document = inject(DOCUMENT)
  constructor() { 
    
  }

  /**
   * This function opens the snackbar in bottom of the document
   * @param message Snackbar message
   * @param textColor Text color of the snackbar message text
   * @param backgroundColor Background color of the snackbar
   */
  openSnackBar(message: string, textColor: string = '#1F509A', backgroundColor: string = '#D4EBF8') {
    const div = this.document.createElement("div");
    const p = this.document.createElement("p");
    p.textContent = message;
    p.style.backgroundColor = backgroundColor
    p.style.color = textColor;
    p.style.boxShadow = `0 0 5px 1px ${textColor}`
    div.appendChild(p);
    div.classList.add("snackbar");
    this.document.body.appendChild(div);
    const hideTimeout = setTimeout(() => {
      div.classList.add("snackbar_hide")
    }, 2750);
    const removeTimeout = setTimeout(() => {
      this.document.body.removeChild(div)
      clearTimeout(hideTimeout)
      clearTimeout(removeTimeout)
    }, 3000);
  }
}

import confetti from 'canvas-confetti';

import '../task/styles.css'
import '../project/styles.css'

export class HtmlApp extends HTMLElement {
  template: HTMLTemplateElement;
  constructor() {
    super();
    this.template = document.getElementById('html-app') as HTMLTemplateElement;
  }
  connectedCallback() {
    window.requestAnimationFrame(() => {
      confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
        resize: true,
        useWorker: true,
      })({ particleCount: 200, spread: 200 });
      const content = this.template.content.firstElementChild?.cloneNode(true);
      content && this.appendChild(content);
    });
  }
}

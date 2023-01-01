import { ObservableElement } from '../shared/observable-element';

export class TaskItemState extends ObservableElement {
  static get observedAttributes() {
    return ['task-name'];
  }
  // template: HTMLTemplateElement;

  constructor() {
    super();
    // this.template = document.getElementById('project-item-state') as HTMLTemplateElement;
  }

  public updateContent() {

    this.innerHTML = `${this.getAttribute('task-name')}
    `

  }

  connectedCallback() {
    super.connectAttributes();
  }
}

import { ObservableElement } from '../shared/observable-element';

export class ProjectSelected extends ObservableElement {
  static get observedAttributes() {
    return ['selected-project'];
  }

  constructor() {
    super();
  }

  public updateContent() {
    if (!this.selectedProject) return (this.innerHTML = '');
    this.innerHTML = `
    <h3>${this.selectedProject.name}</h3>
    <div class="project__state-container">
    ${this.selectedProject.statesAvailable
      .map((st) => `<div class="project__state-item">${st.name}</div>`)}
    </div>
    `.replaceAll(',', '');
  }

  connectedCallback() {
    super.connectAttributes();
  }
}

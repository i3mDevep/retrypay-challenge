import { moduleTask } from '../../core/task/module';
import { ObservableElement } from '../shared/observable-element';

export class ProjectListStates extends ObservableElement {
  static get observedAttributes() {
    return ['selected-project', 'projects'];
  }

  constructor() {
    super();
  }

  public updateContent() {
    if (!this.selectedProject?.name) return (this.innerHTML = '');

    this.innerHTML = `
    <div style="margin: 2rem;">
      ${this.selectedProject.name}
    </div>
    <div style="display:flex;justify-content: center;gap: 50px; max-width: 90%; margin: auto;">
      ${this.selectedProject?.statesAvailable
        .map(
          (st) =>
            ` <project-item-state project-id="${this.selectedProject?.id}" project-state-name="${st.name}"></project-item-state>`,
        )
        .join('')
      }
    </div>
    `;
  }

  connectedCallback() {
    super.connectAttributes();
  }
}

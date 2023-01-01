import { moduleProject } from '../../core/project/module';
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
    <h3 slot="project-title-project">${
      this.selectedProject?.name
    }     <span><button class="project_delete">delete</button></span>
    </h3>
    <div style="display:flex;justify-content: center;gap: 50px;">
    ${this.selectedProject?.statesAvailable
      .map(
        (st) =>
          ` <project-item-state project-id="${this.selectedProject?.id}" project-state-name="${st.name}"></project-item-state>`,
      )
      .join('')}
    </div>
    `;
    const buttonDelete = this.querySelector('button')
    buttonDelete?.addEventListener('click', () => this.deleteProject())
  }

  private async deleteProject(){
    await moduleProject.deleteProject(this.selectedProject!.id);
    window.applicationContext.actions.addListProject(this.projects.filter((p) => p.id !== this.selectedProject!.id));
    window.applicationContext.actions.changeSelectProject(this.selectedProject!.id);
  }

  connectedCallback() {
    super.connectAttributes();
  }
}

import { moduleProject } from '../../core/project/module';
import { ObservableElement } from '../shared/observable-element';

export class ProjectList extends ObservableElement {
  static get observedAttributes() {
    return ['projects'];
  }

  constructor() {
    super();
    this.getProjects();
  }

  private async getProjects() {
    const result = await moduleProject.getProjectList();
    window.applicationContext.actions.addListProject(result)
  }

  public updateContent() {
    this.innerHTML = 
    ` <select name="projects" id="projects">
        <option>Choose a project</option>
        ${this.projects.map(
          (project) => `<option value="${project.id}">${project.name}</option>`,
        )}
      </select>`;
      const select = this.querySelector('select')
      select?.addEventListener('change', (ev) => {
        window.applicationContext.actions.changeSelectProject((ev.target as HTMLInputElement).value)
      })
  }

  connectedCallback() {
    super.connectAttributes();
  }
}

import { moduleTask } from '../../core/task/module';
import { moduleProject } from '../../core/project/module';
import { ObservableElement } from '../shared/observable-element';

export class ProjectSelect extends ObservableElement {
  static get observedAttributes() {
    return ['projects'];
  }

  constructor() {
    super();
    this.getProjects();
  }

  private async getProjects() {
    const result = await moduleProject.getProjectList();
    window.applicationContext.actions.addListProject(result);
  }


  public updateContent() {
    this.innerHTML = ` 
    Choose a project:
    <select name="projects" id="projects" style="margin:10px">
        <option>Create a new project</option>
        ${this.projects.map(
          (project) => `<option value="${project.id}">${project.name}</option>`,
        )}
    </select>
    `;
    const select = this.querySelector('select');
    select?.addEventListener('change', (ev) => {
      const pro = window.applicationContext.actions.changeSelectProject(
        (ev.target as HTMLInputElement).value,
      );
    });
  }

  connectedCallback() {
    super.connectAttributes();
  }
}

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

  private async getTasks(project: string) {
    const tasks = await moduleTask.getListFilterProject(project);
    window.applicationContext.actions.addListTask(tasks);
  }

  public updateContent() {
    this.innerHTML = ` <select name="projects" id="projects">
        <option>Choose a project</option>
        ${this.projects.map(
          (project) => `<option value="${project.id}">${project.name}</option>`,
        )}
      </select>`;
    const select = this.querySelector('select');
    select?.addEventListener('change', (ev) => {
      const pro = window.applicationContext.actions.changeSelectProject(
        (ev.target as HTMLInputElement).value,
      );
      if (pro) this.getTasks(pro.id);
    });
  }

  connectedCallback() {
    super.connectAttributes();
  }
}

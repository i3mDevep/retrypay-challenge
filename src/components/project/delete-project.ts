import { moduleProject } from '../..//core/project/module';
import { ObservableElement } from '../shared/observable-element';

export class ProjectDelete extends ObservableElement {
  static get observedAttributes() {
    return ['selected-project', 'projects'];
  }

  constructor() {
    super();
  }
  public updateContent() {
    if(!this.selectedProject) {
        this.innerHTML = ''
        return
    }
    this.innerHTML = ` 
    <span><button class="project_delete">Delete this project</button></span>
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

import { nanoid } from 'nanoid';
import { moduleProject } from '../../core/project/module';
import { ProjectDomain, statesAvailableDefault } from '../../core/project';
import { ObservableElement } from '../shared/observable-element';

export class CreateProjectForm extends ObservableElement {
  static get observedAttributes() {
    return ['selected-project'];
  }
  template: HTMLTemplateElement;
  form?: HTMLFormElement | null;
  input?: HTMLInputElement | null;

  constructor() {
    super();
    this.template = document.getElementById(
      'create-project-form',
    ) as HTMLTemplateElement;
    this.updateContent();
  }

  private createStatesAvailable() {
    const states = this.input?.value.split(',');
    if (!states) return [];
    return states.map((name, order) => ({ name, order }));
  }

  updateContent(): void {
    if (this.selectedProject) {
      this.innerHTML = '';
      return;
    }

    const content = this.template.content.firstElementChild?.cloneNode(true);
    content && this.replaceChildren(content);
    this.form = this.querySelector('form');
    this.input = this.querySelector('[aria-label="states"]');
    this.input?.setAttribute(
      'value',
      statesAvailableDefault.map((s) => s.name).join(','),
    );
    this.form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const projectNew = new ProjectDomain({
        id: nanoid(),
        name: (e.target as unknown as HTMLInputElement[])[0].value,
        statesAvailable: this.createStatesAvailable(),
      });

      await moduleProject.createNewProject(projectNew);
      window.applicationContext.actions.addListProject([projectNew], true);
      window.applicationContext.actions.changeSelectProject(projectNew.id);
    });
  }

  connectedCallback() {
    super.connectAttributes();
  }
}

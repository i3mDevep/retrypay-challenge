import { nanoid } from 'nanoid';
import { moduleProject } from '../../core/project/module';
import { ProjectDomain, statesAvailableDefault } from '../../core/project';

export class CreateProjectForm extends HTMLElement {
  template: HTMLTemplateElement;
  form?: HTMLFormElement | null;
  input?: HTMLInputElement | null;

  constructor() {
    super();
    this.template = document.getElementById(
      'create-project-form',
    ) as HTMLTemplateElement;
  }

  private createStatesAvailable() {
    const states = this.input?.value.split(',');
    if (!states) return [];
    return states.map((name, order) => ({ name, order }));
  }

  connectedCallback() {
    const content = this.template.content.firstElementChild?.cloneNode(true);
    content && this.appendChild(content);
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
    });
  }
}

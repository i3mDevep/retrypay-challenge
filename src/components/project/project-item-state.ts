import { nanoid } from 'nanoid';
import { moduleTask } from '../../core/task/module';
import { ObservableElement } from '../shared/observable-element';

export class ProjectItemState extends ObservableElement {
  static get observedAttributes() {
    return ['project-state-name', 'project-id', 'tasks'];
  }
  template: HTMLTemplateElement;

  constructor() {
    super();
    this.template = document.getElementById(
      'project-item-state',
    ) as HTMLTemplateElement;
  }

  public updateContent() {
    const content = this.template.content.firstElementChild?.cloneNode(true);
    const [createTask, inputNameTask, containerTasks] =
      (content as Element)?.children ?? [];
    (createTask as HTMLButtonElement).addEventListener('click', async () => {
      const task = {
        id: nanoid(),
        name: (inputNameTask as HTMLInputElement).value,
        priority: 1,
        project: this.getAttribute('project-id')!,
        state: this.getAttribute('project-state-name')!,
      };
      await moduleTask.createNewTask(task);
      window.applicationContext.actions.addListTask([task], true);
    });

    containerTasks.innerHTML = `
    <h3 slot="project-title-state">${this.getAttribute(
      'project-state-name',
    )}</h3>
    
    
    ${this.tasks
      .filter((s) => s.state === this.getAttribute('project-state-name'))
      .map(
        (st) =>
          `<div slot="project-list-task"><task-item task-name="${st.name}"></task-item></div>`,
      )
      .join('')}
    `;

    content && this.replaceChildren(content);
  }

  connectedCallback() {
    super.connectAttributes();
  }
}

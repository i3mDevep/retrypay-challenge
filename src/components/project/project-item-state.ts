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
    
    <div slot="project-list-task" id="project__list-task" draggable="true" class="project__list-task">
    ${this.tasks
      .filter((s) => s.state === this.getAttribute('project-state-name'))
      .map((st) => `<task-item id="item-task-${st.name}" task-name="${st.name}"></task-item>`)
      .join('')}
      </div>
    `;

    content && this.replaceChildren(content);

    const listTask = this.getElementsByClassName('project__list-task')?.[0];
    
    listTask?.addEventListener('drop', (ev: any) => {
      ev.stopPropagation();
      const sourceId = JSON.parse(ev.dataTransfer.getData('text/plain')).parentTaskId;
      const sourceIdEl = document.getElementById(sourceId);
      const targetEl = document.getElementById(ev.target.id);

      if (targetEl && sourceIdEl) listTask?.appendChild(sourceIdEl);

      return false;
    });

    listTask?.addEventListener('dragover', (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }

      return false;
    });

    // (listTask?.[0] as HTMLElement)?.addEventListener('dragenter', () => {
    //   (listTask?.[0] as HTMLElement)?.classList.add('over');
    // });

    // (listTask?.[0] as HTMLElement)?.addEventListener('dragleave', () => {
    //   (listTask?.[0] as HTMLElement)?.classList.remove('over');
    // });
  }

  connectedCallback() {
    super.connectAttributes();
  }
}

import { nanoid } from 'nanoid';
import type { TaskDomainProps } from '../../core/task';
import { moduleTask } from '../../core/task/module';
import { ObservableElement } from '../shared/observable-element';

type UpdateDataType = Pick<TaskDomainProps, 'id' | 'priority' | 'state'>;

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
        priority: -1, // Auto increment
        project: this.getAttribute('project-id')!,
        state: this.getAttribute('project-state-name')!,
      };
      await moduleTask.createNewTask(task);
      const taskCreated = await moduleTask.getTask(task.id);
      window.applicationContext.actions.addListTask([taskCreated], true);
    });

    containerTasks.innerHTML = `
    <p slot="project-title-state" class="project__title-state">${this.getAttribute(
      'project-state-name',
    )?.toLocaleLowerCase()}</p>
    
    <div slot="project-list-task" id="project__list-task" draggable="true" class="project__list-task">
    ${this.tasks
      .filter((s) => s.state === this.getAttribute('project-state-name'))
      .sort((so, sop) => {
        if (so.priority > sop.priority) return 1;
        return -1;
      })
      .map(
        (st) =>
          `<task-item 
            id="item-task-${st.id}" 
            task-name="${st.name}" task-priority="${st.priority}" 
            task-state="${st.state}">
          </task-item>`,
      )
      .join('')}
      </div>
    `;

    content && this.replaceChildren(content);

    const listTask = this.getElementsByClassName('project__list-task')?.[0];

    listTask?.addEventListener('drop', async (ev: any) => {
      ev.stopPropagation();
      const sourceId = JSON.parse(
        ev.dataTransfer.getData('text/plain'),
      ).parentTaskId;
      const sourceIdEl = document.getElementById(sourceId);
      sourceIdEl?.setAttribute(
        'task-state',
        this.getAttribute('project-state-name')!,
      );
      const targetEl = document.getElementById(ev.target.id);

      if (targetEl && sourceIdEl) {
        listTask?.appendChild(sourceIdEl);
        const priority = await moduleTask.getPriorityAuto(
          this.getAttribute('project-id')!,
          this.getAttribute('project-state-name')!,
        );
        this.updateTaskInDatabase({
          id: sourceIdEl.id.replace('item-task-', ''),
          priority,
          state: this.getAttribute('project-state-name')!,
        });
      }
      listTask?.classList.remove('over');

      return false;
    });

    listTask?.addEventListener('dragover', (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }

      return false;
    });

    listTask?.addEventListener('dragenter', () => {
      listTask?.classList.add('over');
    });

    listTask?.addEventListener('dragleave', () => {
      listTask?.classList.remove('over');
    });
  }

  private async updateTaskInDatabase(data: UpdateDataType) {
    await moduleTask.updatePartial({ ...data });
    const taskUpdate = await moduleTask.getTask(data.id);
    window.applicationContext.actions.updateTask(taskUpdate);
  }

  connectedCallback() {
    super.connectAttributes();
  }
}

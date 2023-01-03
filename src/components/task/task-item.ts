import { ObservableElement } from '../shared/observable-element';
export class TaskItemState extends ObservableElement {
  static get observedAttributes() {
    return ['task-name'];
  }

  constructor() {
    super();
  }

  private handleDragAndDrop(taskContainer: HTMLDivElement) {
    taskContainer.addEventListener('dragstart', (e: any) => {
      taskContainer.style.opacity = '0.4';
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.setData(
        'text/plain',
        JSON.stringify({ taskId: e.target.id, parentTaskId: this.id }),
      );
    });
    taskContainer.addEventListener('dragend', () => {
      taskContainer.style.opacity = '1';
      taskContainer.classList.remove('over');
    });

    taskContainer.addEventListener('dragenter', () => {
      taskContainer.classList.add('over');
    });

    taskContainer.addEventListener('dragleave', () => {
      taskContainer.classList.remove('over');
    });
    taskContainer.addEventListener('dragover', (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }

      return false;
    });

    taskContainer.addEventListener('drop', (ev: any) => {
      ev.stopPropagation();
      const sourceId = JSON.parse(ev.dataTransfer.getData('text/plain')).taskId;
      const sourceIdEl = document.getElementById(sourceId);
      const targetEl = document.getElementById(ev.target.id);

      const holder = sourceIdEl?.cloneNode(true);

      if (targetEl && sourceIdEl) {
        sourceIdEl.innerHTML = targetEl.innerHTML;
        holder?.childNodes?.[0] &&
          targetEl.replaceChildren(holder.childNodes[0]);
      }

      return false;
    });
  }

  public updateContent() {
    const taskContainer = document.createElement('div');

    taskContainer.setAttribute('class', 'task__item-box');
    taskContainer.setAttribute('id', this.getAttribute('task-name')!);
    taskContainer.setAttribute('draggable', 'true');

    this.handleDragAndDrop(taskContainer);

    const spanNameTask = document.createElement('span');
    spanNameTask.innerHTML = this.getAttribute('task-name')!;

    taskContainer.appendChild(spanNameTask);
    this.appendChild(taskContainer);
  }

  connectedCallback() {
    super.connectAttributes();
  }
}

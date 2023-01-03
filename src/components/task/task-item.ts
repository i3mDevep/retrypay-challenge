import { moduleTask } from '../../core/task/module';
import type { TaskDomainProps } from '../../core/task';
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
        JSON.stringify({ parentTaskId: this.id }),
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
      const sourceId = JSON.parse(
        ev.dataTransfer.getData('text/plain'),
      ).parentTaskId;
      const sourceIdEl = document.getElementById(sourceId);
      const targetEl = document.getElementById(this.id);

      const holderId = sourceIdEl?.id;
      const holderName = sourceIdEl?.getAttribute('task-name');
      const targetName = targetEl?.getAttribute('task-name');

      const holder = sourceIdEl?.children[0]?.cloneNode(true) as HTMLElement;

      if (targetEl && sourceIdEl && holder && holderId) {
        sourceIdEl.id = this.id;
        sourceIdEl.setAttribute('task-name', targetName!);
        targetEl.id = holderId;
        targetEl.setAttribute('task-name', holderName!);

      }

      return false;
    });
  }

  public updateContent() {
    const taskContainer = document.createElement('div');

    taskContainer.setAttribute('class', 'task__item-box');
    taskContainer.setAttribute('draggable', 'true');

    this.handleDragAndDrop(taskContainer);

    const spanNameTask = document.createElement('span');
    const icon = `
    <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch -->
    <title>story</title>
    <desc>Created with Sketch.</desc>
    <defs/>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="story" sketch:type="MSArtboardGroup">
            <g id="Story" sketch:type="MSLayerGroup" transform="translate(1.000000, 1.000000)">
                <rect id="Rectangle-36" fill="#63BA3C" sketch:type="MSShapeGroup" x="0" y="0" width="14" height="14" rx="2"/>
                <path d="M9,3 L5,3 C4.448,3 4,3.448 4,4 L4,10.5 C4,10.776 4.224,11 4.5,11 C4.675,11 4.821,10.905 4.91,10.769 L4.914,10.77 L6.84,8.54 C6.92,8.434 7.08,8.434 7.16,8.54 L9.086,10.77 L9.09,10.769 C9.179,10.905 9.325,11 9.5,11 C9.776,11 10,10.776 10,10.5 L10,4 C10,3.448 9.552,3 9,3" id="Page-1" fill="#FFFFFF" sketch:type="MSShapeGroup"/>
            </g>
        </g>
    </g>
    </svg>`;

    spanNameTask.innerHTML = this.getAttribute('task-name')!;

    const containerIcon = document.createElement('div');
    containerIcon.setAttribute('style', 'position:absolute;');
    containerIcon.innerHTML = icon;

    taskContainer.appendChild(spanNameTask);
    taskContainer.appendChild(containerIcon);

    this.replaceChildren(taskContainer);
  }

  private async updateTaskInDatabase(
    source: Partial<TaskDomainProps>,
    target: Partial<TaskDomainProps>,
  ) {
    console.log(
      '🚀 ~ file: project-item-state.ts:86 ~ ProjectItemState ~ updateTaskInDatabase ~ target',
      target,
    );
    console.log(
      '🚀 ~ file: project-item-state.ts:86 ~ ProjectItemState ~ updateTaskInDatabase ~ source',
      source,
    );

    // window.applicationContext.actions.addListTask([task], true);
  }

  connectedCallback() {
    super.connectAttributes();
  }
}

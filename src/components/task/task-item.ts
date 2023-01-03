import { ObservableElement } from '../shared/observable-element';

var dragged: HTMLElement
export class TaskItemState extends ObservableElement {
  static get observedAttributes() {
    return ['task-name'];
  }

  constructor() {
    super();
  }

  public updateContent() {
    const taskContainer = document.createElement('div');
    const parentTask = this.parentNode as HTMLDivElement
    console.log("🚀 ~ file: task-item.ts:91 ~ TaskItemState ~ updateContent ~ this.parentNode", parentTask)

    parentTask.setAttribute('class', 'task__item-box');
    parentTask.setAttribute('task-name', this.getAttribute('task-name')!);
    parentTask.setAttribute('draggable', 'true');

    parentTask.addEventListener('dragstart', (e: any) => {
      dragged = e.target
      parentTask.style.opacity = '0.4';
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.setData('text/html', this.innerHTML);
    });
    parentTask.addEventListener('dragend', () => {
      parentTask.style.opacity = '1';
      parentTask.classList.remove('over');

    });

    parentTask.addEventListener('dragenter', () =>
      {parentTask.classList.add('over')

    },
    );

    parentTask.addEventListener('dragleave', () =>
      {parentTask.classList.remove('over')

    },
    );
    parentTask.addEventListener('dragover', (e) =>
    {
      if (e.preventDefault) {
        e.preventDefault();
      }

      return false;
    }
  );

  parentTask.addEventListener('drop', (e: any) => {
      e.stopPropagation();
      console.log("🚀 ~ file: task-item.ts:72 ~ TaskItemState ~ taskContainer.addEventListener ~ e", e)


      // const spanNameTask = document.createElement('span');

      // e.target.replaceChildren(spanNameTask)
      if(parentTask.innerHTML !== e.dataTransfer.getData('text/html')) {


        // dragged?.parentNode?.removeChild( dragged );
        parentTask?.parentNode?.appendChild( dragged );
        console.log("🚀 ~ file: task-item.ts:69 ~ TaskItemState ~ parentTask.addEventListener ~ parentTask", parentTask)
        // console.log("🚀 ~ file: task-item.ts:69 ~ TaskItemState ~ parentTask.addEventListener ~ e.dataTransfer.getData('text/html')", e.dataTransfer.getData('text/html'))



      }

      // alert('drop')
      // this.innerHTML = e.dataTransfer.getData('text/html');

      return false;
    });

    const spanNameTask = document.createElement('span');
    spanNameTask.innerHTML = this.getAttribute('task-name')!;

    taskContainer.appendChild(spanNameTask);
    this.appendChild(taskContainer);
  }

  connectedCallback() {
    super.connectAttributes();
  }
}

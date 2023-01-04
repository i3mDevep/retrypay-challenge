import { nanoid } from 'nanoid';
import { moduleTask } from '../../core/task/module';
import { ObservableElement } from '../shared/observable-element';

export class TaskCreate extends ObservableElement {
  static get observedAttributes() {
    return ['project-state-name', 'project-id'];
  }

  constructor() {
    super();

  }

  public updateContent() {

    const createTaskButton = document.createElement('button')
    const inputTaskName = document.createElement('button')
    inputTaskName.setAttribute('type', 'text')
    inputTaskName.setAttribute('placeholder', 'Name task')
    inputTaskName.setAttribute('aria-label', 'name-task')

    createTaskButton.setAttribute('class', 'project__add-task')
    createTaskButton.setAttribute('style', 'margin-bottom: 10px;');
    createTaskButton.innerHTML = 'Add new task'


    this.appendChild(createTaskButton)
    this.appendChild(inputTaskName)

    createTaskButton.addEventListener('click', async () => {
      const task = {
        id: nanoid(),
        name: inputTaskName.value,
        priority: -1, // Auto increment
        project: this.getAttribute('project-id')!,
        state: this.getAttribute('project-state-name')!,
      };

      await moduleTask.createNewTask(task);
      const taskCreated = await moduleTask.getTask(task.id);
      window.applicationContext.actions.addListTask([taskCreated], true);
    });

  }
  
}

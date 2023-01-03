import { HtmlApp } from './html-app/html-app';
import { ProjectSelect } from './project/project-select'
import { ProjectListStates } from './project/project-list-states'
import { CreateProjectForm } from './project/create-project-form'
import { ProjectItemState } from './project/project-item-state'

import { TaskItemState } from './task/task-item'
import { ProjectDelete } from './project/delete-project';

export function createWebComponents() {
  window.customElements.define('html-app', HtmlApp);
  window.customElements.define('project-select', ProjectSelect);
  window.customElements.define('project-list-states', ProjectListStates);
  window.customElements.define('project-item-state', ProjectItemState);
  window.customElements.define('project-delete', ProjectDelete);
  window.customElements.define('create-project-form', CreateProjectForm);
  window.customElements.define('task-item', TaskItemState);
  
}

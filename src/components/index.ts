import { HtmlApp } from './html-app/html-app';
import { ProjectList } from './project/project-list'
import { ProjectSelected } from './project/project-selected'
import {  CreateProjectForm } from './project/create-project-form'

export function createWebComponents() {
  window.customElements.define('html-app', HtmlApp);
  window.customElements.define('project-list', ProjectList);
  window.customElements.define('project-selected', ProjectSelected);
  window.customElements.define('create-project-form', CreateProjectForm);
}

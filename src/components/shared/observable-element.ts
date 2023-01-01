import type { ProjectDomain } from 'src/core/project';
import type { InitStateInterface } from 'src/store/state';
import { equalDeep } from '../../utils/equalDeep';

interface ParamsConstructorInterface {
  name: string;
  observedAttributes: string[];
}

export abstract class ObservableElement extends HTMLElement {
  abstract updateContent(): void;

  get projects() {
    if (!this.hasAttribute('projects')) return [];

    return JSON.parse(this.getAttribute('projects')!) as ProjectDomain[];
  }

  set projects(value) {
    if (
      (
        this.constructor as unknown as ParamsConstructorInterface
      ).observedAttributes.includes('projects') &&
      !equalDeep(this.projects, value)
    ) {
      this.setAttribute('projects', JSON.stringify(value));
    }
  }

  get selectedProject() {
    if (!this.hasAttribute('selected-project')) return undefined;
    try {
      return JSON.parse(this.getAttribute('selected-project')!) as ProjectDomain;
    } catch (error) {
      return undefined
    }
  }

  set selectedProject(value) {
    if (
      (
        this.constructor as unknown as ParamsConstructorInterface
      ).observedAttributes.includes('selected-project') &&
      this.selectedProject !== value
    ) {
      this.setAttribute('selected-project', JSON.stringify(value));
    }
  }

  connectAttributes() {
    window.applicationContext.observableState.addChangeListener(
      (state: InitStateInterface) => {
        this.projects = state.projects;
        this.selectedProject = state.selectedProject;
      },
    );
  }

  attributeChangedCallback() {
    this.updateContent();
  }
}

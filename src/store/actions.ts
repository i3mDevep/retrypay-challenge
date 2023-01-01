import type { InitStateInterface } from './state';

export const actionsFactory = (state: InitStateInterface) => {
  const changeSelectProject = (projectId: string) => {
    const project = state.projects.find((p) => p.id === projectId);
    state.selectedProject = project;
  };

  const addListProject = (
    projects: InitStateInterface['projects'],
    merge = false,
  ) => {
    if (!merge) return state.projects = projects;
    state.projects = [...state.projects, ...projects]
  };

  return {
    addListProject,
    changeSelectProject,
  };
};

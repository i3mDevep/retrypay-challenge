import type { InitStateInterface } from './state';

export const actionsFactory = (state: InitStateInterface) => {
  
  const changeSelectProject = (projectId: string) => {
    const project = state.projects.find((p) => p.id === projectId);
    state.selectedProject = project;
    return project;
  };

  const addListProject = (
    projects: InitStateInterface['projects'],
    merge = false,
  ) => {
    if (!merge) return (state.projects = projects);
    state.projects = [...state.projects, ...projects];
  };

  const addListTask = (tasks: InitStateInterface['tasks'], merge = false) => {
    if (!merge) return (state.tasks = tasks);
    state.tasks = [...state.tasks, ...tasks];
  };

  const updateTask = (task: InitStateInterface['tasks'][0]) => {
    const taskFindInd = state.tasks.findIndex((t) => (t.id = task.id));
    if (taskFindInd !== -1) {
      state.tasks[taskFindInd] = task;
    }
  };

  return {
    updateTask,
    addListTask,
    addListProject,
    changeSelectProject,
  };
};

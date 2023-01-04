import type { TaskDomain } from './task.domain';

export class TaskDomainServices {
  constructor() {}

  autoIncrementPriority(taskProject: TaskDomain[]) {
    return Math.max(0, ...taskProject.map((tp) => tp.priority)) + 1;
  }

  validatePriority(taskProject: TaskDomain[], priority: number) {
    if (taskProject.some((task) => task.priority === priority))
      return Promise.reject('priority must be unique');
  }
}

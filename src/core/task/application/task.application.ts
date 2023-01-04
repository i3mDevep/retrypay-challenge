import type { TaskDomain } from '../domain/task.domain';
import type { TaskRepository } from '../domain/task.repository';
import { TaskDomainServices } from '../domain/task.services';

export class TaskApplication {
  private taskServices: TaskDomainServices;
  constructor(private repository: TaskRepository) {
    this.taskServices = new TaskDomainServices();
  }

  getTaskListAll() {
    return this.repository.getListAll();
  }

  getTask(id: string) {
    return this.repository.getItem(id);
  }

  getListFilterProject(project: string) {
    return this.repository.getListByProject(project);
  }

  deleteTask(projectId: string) {
    return this.repository.delete(projectId);
  }

  async updatePartial(data: Partial<TaskDomain> & { id: string }) {
    return this.repository.patch(data);
  }

  async createNewTask(data: TaskDomain) {
    const { project, state } = data;

    const tasksByProjectAndState = await this.filterByStateAndTask(
      project,
      state,
    );

    const priority = this.getPriorityCondition(
      data.priority,
      tasksByProjectAndState,
    );

    await this.taskServices.validatePriority(tasksByProjectAndState, priority);
    return this.repository.create({ ...data, priority });
  }

  async getPriorityAuto(project: string, state: string) {
    const tasksByProjectAndState = await this.filterByStateAndTask(
      project,
      state,
    );
    return this.getPriorityCondition(-1, tasksByProjectAndState);
  }

  private async filterByStateAndTask(project: string, state: string) {
    return (await this.repository.getListByProject(project)).filter(
      (tf) => tf.state === state,
    );
  }

  private getPriorityCondition(priority: number, tasks: TaskDomain[]) {
    return priority < 0
      ? this.taskServices.autoIncrementPriority(tasks)
      : priority;
  }
}

import type { TaskDomain } from './task.domain';

export interface TaskRepository {
  getListAll(): Promise<TaskDomain[]>;
  getListByProject(project: string): Promise<TaskDomain[]>;
  create(data: TaskDomain): Promise<void>;
  getItem(id: string): Promise<TaskDomain>;
  patch(data: Partial<TaskDomain> & { id: string }): Promise<void>;
  update(data: TaskDomain): Promise<void>;
  delete(taskId: string): Promise<void>;
}

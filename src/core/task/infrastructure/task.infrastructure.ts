import { PersistenceLocalStorage } from '../../../core/shared/infrastructure/persistence.infrastructure';
import { TaskDomain, TaskDomainProps } from '../domain/task.domain';
import type { TaskRepository } from '../domain/task.repository';
import { list as mocks } from './task.mocks';

export class TaskInfrastructure
  extends PersistenceLocalStorage<TaskDomainProps, TaskDomain>
  implements TaskRepository
{
  constructor() {
    super('tasks', TaskDomain.fromPrimitives, mocks);
  }
  getListByProject(
    project: string,
  ): Promise<TaskDomain[]> {
    return Promise.resolve(
      this.db
        .map((l) => TaskDomain.fromPrimitives(l))
        .filter((a) => a.project === project),
    );
  }
}

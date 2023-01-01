import { PersistenceLocalStorage } from '../../../core/shared/infrastructure/persistence.infrastructure';
import { ProjectDomain, ProjectDomainProps } from '../domain/project.domain';
import type { ProjectRepository } from '../domain/project.repository';
import { list as mocks } from './project.mocks';

export class ProjectInfrastructure
  extends PersistenceLocalStorage<ProjectDomainProps, ProjectDomain>
  implements ProjectRepository
{
  constructor() {
    super('projects', ProjectDomain.fromPrimitives, mocks);
  }
}

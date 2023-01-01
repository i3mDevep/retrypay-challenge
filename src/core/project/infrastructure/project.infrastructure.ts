import { ProjectDomain, ProjectDomainProps } from '../domain/project.domain';
import type { ProjectRepository } from '../domain/project.repository';
import { list as mocks } from './project.mocks';

const projects = localStorage.getItem('projects')
  ? (JSON.parse(localStorage.getItem('projects')!) as ProjectDomainProps[])
  : mocks;

if (!localStorage.getItem('projects')) {
  localStorage.setItem('projects', JSON.stringify(mocks));
}

export class ProjectInfrastructure implements ProjectRepository {
  getListAll(): Promise<ProjectDomain[]> {
    return Promise.resolve(
      projects.map((l) => ProjectDomain.fromPrimitives(l)),
    );
  }
  create(data: ProjectDomain): Promise<void> {
    projects.push(data);
    localStorage.setItem('projects', JSON.stringify(projects));
    return Promise.resolve();
  }
}

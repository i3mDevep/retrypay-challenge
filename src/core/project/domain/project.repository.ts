import type { ProjectDomain } from "./project.domain";

export interface ProjectRepository {
    getListAll(): Promise<ProjectDomain[]>
    create(data: ProjectDomain): Promise<void>
}
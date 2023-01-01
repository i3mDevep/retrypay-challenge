import type { ProjectDomain } from "../domain/project.domain";
import type { ProjectRepository } from "../domain/project.repository";

export class ProjectApplication {
    constructor(private repository: ProjectRepository){}

    getProjectList(){
        return this.repository.getListAll()
    }
    
    createNewProject(data: ProjectDomain){
        return this.repository.create(data)
    }

    deleteProject(projectId: string){
        return this.repository.delete(projectId)
    }
}
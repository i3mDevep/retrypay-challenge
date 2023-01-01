import type { TaskDomain } from "../domain/task.domain";
import type { TaskRepository } from "../domain/task.repository";

export class TaskApplication {
    constructor(private repository: TaskRepository){}

    getTaskListAll(){
        return this.repository.getListAll()
    }

    getListFilterProject(project: string){
        return this.repository.getListByProject(project)
    }
    
    createNewTask(data: TaskDomain){
        return this.repository.create(data)
    }

    deleteTask(projectId: string){
        return this.repository.delete(projectId)
    }
}
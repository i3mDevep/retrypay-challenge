import type { TaskDomain } from "../core/task";
import type { ProjectDomain } from "../core/project";

export interface InitStateInterface {
    projects: ProjectDomain[]
    tasks: TaskDomain[]
    selectedProject: ProjectDomain | undefined
}

export const INITIAL_STATE: InitStateInterface = {
    projects: [],
    tasks: [],
    selectedProject: undefined
  }
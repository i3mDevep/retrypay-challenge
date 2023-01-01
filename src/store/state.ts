import type { ProjectDomain } from "src/core/project";

export interface InitStateInterface {
    projects: ProjectDomain[]
    tasks: any[]
    selectedProject: ProjectDomain | undefined
}

export const INITIAL_STATE: InitStateInterface = {
    projects: [],
    tasks: [],
    selectedProject: undefined
  }
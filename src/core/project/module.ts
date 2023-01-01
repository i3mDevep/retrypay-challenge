import { ProjectApplication } from './application/project.application'
import { ProjectInfrastructure } from './infrastructure/project.infrastructure'

export const moduleProject = new ProjectApplication(new ProjectInfrastructure())
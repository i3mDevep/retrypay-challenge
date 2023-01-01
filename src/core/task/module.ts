import { TaskApplication } from './application/task.application'
import { TaskInfrastructure } from './infrastructure/task.infrastructure'

export const moduleTask = new TaskApplication(new TaskInfrastructure())
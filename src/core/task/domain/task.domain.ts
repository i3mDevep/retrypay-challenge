export interface TaskDomainProps {
    id: string
    name: string
    project: string
    state: string
    priority: number
}

export class TaskDomain implements TaskDomainProps {
    id!: string;
    name!: string;
    project!: string
    state!: string
    priority!: number
    constructor(props: TaskDomainProps) {
      Object.assign(this, props);
    }

    static fromPrimitives(props: TaskDomainProps) {
      return new TaskDomain(props);
    }
  }
  
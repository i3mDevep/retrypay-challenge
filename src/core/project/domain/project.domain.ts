enum DEFAULT_STATES {
  TODO,
  PROGRESSING,
  DONE,
}

export interface ProjectDomainProps {
  id: string;
  name: string;
  statesAvailable: {
    order: number;
    name: string | DEFAULT_STATES;
  }[];
}

export const statesAvailableDefault = Object.values(DEFAULT_STATES)
  .map((name, order) => ({
    name,
    order,
  }))
  .filter(({ name }) => typeof name === 'string');

export class ProjectDomain implements ProjectDomainProps {
  id!: string;
  name!: string;
  statesAvailable!: { order: number; name: string }[];
  constructor(props: ProjectDomainProps) {
    Object.assign(this, props, {
      statesAvailable: !props?.statesAvailable.length
        ? statesAvailableDefault
        : props.statesAvailable,
    });
  }

  static fromPrimitives(props: ProjectDomainProps) {
    return new ProjectDomain(props);
  }
}

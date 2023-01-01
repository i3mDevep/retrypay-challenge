import type { ProjectDomainProps } from '../domain/project.domain';

export const list: ProjectDomainProps[] = [
  {
    id: '1',
    name: 'Example project',
    statesAvailable: [],
  },
  {
    id: '2',
    name: 'Development project',
    statesAvailable: [
      {
        name: 'ARCHIVED',
        order: 4,
      },
    ],
  },
];

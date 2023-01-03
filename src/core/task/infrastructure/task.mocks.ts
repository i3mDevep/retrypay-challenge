import type { TaskDomainProps } from '../domain/task.domain';

export const list: TaskDomainProps[] = [
  {
    id: '1',
    name: 'Create mocks for testing module app',
    priority: 1,
    project: '1',
    state: 'TODO'
  },
  {
    id: '2',
    name: 'Clear code and refactoring structure',
    priority: 1,
    project: '1',
    state: 'PROGRESSING'
  },
];

import type { actionsFactory } from '../src/store/actions';

declare global {
  interface Window {
    applicationContext: {
      observableState: Record<string, any>;
      actions: ReturnType<typeof actionsFactory>
    };
  }
}

import { observableFactory } from './store/observable';
import { actionsFactory } from './store/actions';

import { INITIAL_STATE } from './store/state';
import { createWebComponents } from './components';

const observableState = observableFactory(INITIAL_STATE);
const actions = actionsFactory(observableState);

window.applicationContext = Object.freeze({
  observableState,
  actions,
});

createWebComponents();

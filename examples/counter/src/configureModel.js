import container from './container'
import nap from './nap'

// Monitor
import { subscribe } from 'sam-devtools'
import render from 'sam-devtools-monitor'
subscribe(render)

import { createModel } from 'sam'
import { instrument, liftContainer, liftNap } from 'sam-devtools'

// Input: Store (from Model)
// Output: State (to View and nap)
const state = store => {
  return {
    counter: store.counter,
    launchImminent: (store.counter == 9),
    hasLaunched: (store.launched ? true : false),
  }
}

export default function configureModel(initialStore) {
  const model = createModel(container, state, nap, initialStore, instrument)
  if (module.hot) {
    module.hot.accept('./container', _ =>
      model.replaceContainer(liftContainer(require('./container').default)))
    module.hot.accept('./nap', _ =>
      model.replaceNap(liftNap(require('./nap').default)))
  }
  return model
}

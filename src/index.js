// import { createModel } from 'sam'

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 * Shamelessly copied from Redux by Gunar
 */
function isCrushed() {}

if (
  process.env.NODE_ENV !== 'production' &&
  typeof isCrushed.name === 'string' &&
    isCrushed.name !== 'isCrushed'
) {
  console.log('You are currently using minified code outside of NODE_ENV === \'production\'.')
}

let snapshots = []
const listeners = []

export const subscribe = listener => {
  listeners.push(listener)
  listener(snapshots)

  return function unsubscribe() {
    const index = listeners.indexOf(listener)
    listeners.splice(index, 1)
  }
}
const publish = _ => listeners.forEach(listener => listener(snapshots))

function liftContainer(container) {
  return (store, dataset) => {
    const newStore = container(store, dataset)
    snapshots.push({
      dataset: { ...dataset },
      store: { ...newStore },
    })
    publish()
    return newStore
  }
}

// TODO
const loadSnapshot = i => {
  store = getSnapshot(i)
  updateState()
}
const getSnapshot = index => {
  snapshots = snapshots.slice(0, (index+1))
  publish()
  return { ...snapshots[index].store }
}

export function instrument(createModel) {
  return (container, state, nap, initialStore, enhancer) => {

    console.log('SAM-devtools ONLINE! *********************')
    const liftedModel = createModel(liftContainer(container), state, nap, initialStore, enhancer)

    return liftedModel
  }
}

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
let model
const listeners = []

export const subscribe = listener => {
  listeners.push(listener)
  listener(snapshots)

  return function unsubscribe() {
    const index = listeners.indexOf(listener)
    listeners.splice(index, 1)
  }
}

const loadSnapshot = i => model.replaceStore(getSnapshot(i))

const publish = _ => listeners.forEach(listener => listener(snapshots, loadSnapshot))


export function liftContainer(container) {
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

const getSnapshot = index => {
  snapshots = snapshots.slice(0, (index+1))
  publish()
  return { ...snapshots[index].store }
}

export function liftNap(nap) {
  return currentState => {
    return present => {
      return nap(currentState)(dataset => {
        const liftedDataset = {
          ...dataset,
          '@@nap': true,
        }
        return present(liftedDataset)
      })
    }
  }
}

export function instrument(createModel) {
  // This reference can't change otherwise the View will get lost
  return (container, state, nap, initialStore, enhancer) => {

    model = createModel(liftContainer(container), state, liftNap(nap), initialStore, enhancer)
    console.log('SAM-devtools ONLINE! *********************')
    return model
  }
}

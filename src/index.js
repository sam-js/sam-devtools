import deepEqual from 'deep-equal'
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

const MAX_PRESENTS_FROM_NAP = 10
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
    // check for infinite loop in nap
    if (dataset['@@napLoop']) {
      const newStore = { '@napLoop': true }
      snapshots.push({
        dataset: { ...dataset },
        store: {},
      })
      publish()
      return newStore
    }
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

const fromNap = snapshot => snapshot.dataset['@@nap'] !== undefined

export function liftNap(nap) {
  return currentState => {
    return present => {
      return nap(currentState)(dataset => {
        // check for infinite loop in nap
        const lastSnapshot = snapshots[snapshots.length -1]

        if (lastSnapshot.dataset['@@napLoop']) {
          return
        }

        const tooManyPresentsFromNAP = snapshots.slice(-MAX_PRESENTS_FROM_NAP).filter(fromNap).length == MAX_PRESENTS_FROM_NAP
        if (tooManyPresentsFromNAP) {
          return present({ '@@napLoop': 'too many present()s from NAP' })
        }

        const secondLastSnapshot = snapshots[snapshots.length -2]
        const ineffectiveNAP = fromNap(lastSnapshot) && fromNap(secondLastSnapshot) && deepEqual(lastSnapshot.store, secondLastSnapshot.store)
        if (ineffectiveNAP) {
          return present({ '@@napLoop': 'last present() from NAP didn\'t change the store' })
        }
        const liftedDataset = {
          ...dataset,
          '@@nap': true,
        }
        return(present(liftedDataset))
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

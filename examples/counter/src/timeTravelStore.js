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

export const getListOfSnapshots = _ => snapshots
export const getSnapshot = index => {
  snapshots = snapshots.slice(0, (index+1))
  publish()
  return { ...snapshots[index].store }
}


export const saveSnapshot = (dataset, store) => {

  snapshots.push({
    dataset: { ...dataset },
    store: { ...store },
  })
  console.log('Saved snapshots:', snapshots)

  // Publish to subscribers
  publish()
}

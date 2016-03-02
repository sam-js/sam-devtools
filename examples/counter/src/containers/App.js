import React from 'react'

const App = ({
  dispatch,
  state,
}) => {
  const inc = _ => dispatch({ type: 'INC' })
  return (
    <div>
      <p>Counter: {state.counter} {state.isSix ? '(will skip 7)' : ''}</p>
      <p>More than five? {state.moreThanFive ? 'yes' : 'no'}</p>
      <button onClick={inc}>INC</button>
      <pre>{JSON.stringify(state)}</pre>
    </div>
  )
}
export default App

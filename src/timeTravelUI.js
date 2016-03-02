require('./style.css')

const render = snapshots => {
  let node = document.getElementById('SAMTimeTravelUI')
  if (!node) {
    node = document.createElement('div')
    node.id = 'SAMTimeTravelUI'
    document.body.appendChild(node)
  }
  node.innerHTML = snapshots.map((snapshot, i) => {
    return `
      <div class="snapshot" onClick="loadSnapshot(${i})">
        <p>${i}</p>
        <h3>Dataset presented</h3>
        <pre>${JSON.stringify(snapshot.dataset)}</pre>
        <h3>Store (Model)</h3>
        <pre>${JSON.stringify(snapshot.store)}</pre>
      </div>`
  }).join('')
  node.scrollTop = node.scrollHeight

}

export default render

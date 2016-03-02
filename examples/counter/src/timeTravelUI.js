// https://davidwalsh.name/add-rules-stylesheets
const sheet = (function() {
	// Create the <style> tag
	const style = document.createElement("style")

	// Add a media (and/or media query) here if you'd like!
	// style.setAttribute("media", "screen")
	// style.setAttribute("media", "only screen and (max-width : 1024px)")

	// WebKit hack :(
	style.appendChild(document.createTextNode(""))

	// Add the <style> element to the page
	document.head.appendChild(style)

	return style.sheet
})()
function addCSSRule(sheet, selector, rules, index) {
  if("insertRule" in sheet) {
    sheet.insertRule(selector + "{" + rules + "}", index)
  }
  else if("addRule" in sheet) {
    sheet.addRule(selector, rules, index)
  }
}


addCSSRule(
  sheet,
  '#SAMTimeTravelUI',
  `
  background-color: yellow;
  width: 300px;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  font-family: Courier, monospace, sans-serif;
  height: 100%;
  overflow-y: scroll;
  `)
addCSSRule(
  sheet,
  '#SAMTimeTravelUI .snapshot',
  `
  border-top: 2px solid black;
  cursor: pointer;
  `)
addCSSRule(
  sheet,
  '#SAMTimeTravelUI .snapshot:first-of-type',
  `
  border-top:none !important
  `)


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

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


const render = snapshots => {
  let node = document.getElementById('SAMTimeTravelUI')
  if (!node) {
    node = document.createElement('div')
    document.body.appendChild(node)
  }
}

export default render

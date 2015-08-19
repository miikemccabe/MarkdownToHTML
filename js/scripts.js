/*
* Marked options
*
* https://github.com/chjj/marked
*/

var renderer = new marked.Renderer();
renderer.paragraph = function(text) {
  return '<p>' + text + '</p>\n\n';
};

marked.setOptions({ 
  renderer: renderer, 
  gfm: true 
});

/*
* Global variables
*/

var renderedMarkdown = "";
var markdownTextBox = document.getElementById('markdown');
var resultDiv = document.getElementById('result');

/*
* Functions
*/

function processMarkdown() {
  resultDiv.innerHTML = ""; // This helps the rendering
	renderedMarkdown = encode(marked(markdownTextBox.value));
	resultDiv.innerHTML = renderedMarkdown;
}

function copyToClipBoard() {
  console.log("copyToClipboard called");
	var result = document.getElementById('result');
	var range = document.createRange();
	range.selectNodeContents(result);
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
	document.execCommand('copy', false, null);
	window.getSelection().removeAllRanges();
	$('#notification').css('opacity', 1).delay(2000).animate({
	  opacity: 0
	}, 1000);
}

function clearAll() {
	markdownTextBox.value = "";
	resultDiv.innerHTML = "";
}

function encode(text) {
  var newText = text.replace(/</g, "&lt;");
  return newText.replace(/>/g, "&gt;");
}

/*
* Add event listeners
*/
markdownTextBox.addEventListener('keyup', processMarkdown);
document.getElementById("clear").addEventListener('click', clearAll);
document.getElementById("copy").addEventListener('click', copyToClipBoard);
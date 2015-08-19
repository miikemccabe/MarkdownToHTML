
var KeyCodes = {
  ENTER : 13,
  TAB   : 9
};

var renderedMarkdown = "";
var markdownTextBox = document.getElementById('markdown');
var resultDiv = document.getElementById('result');

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
	var markdown = document.getElementById('markdown');
	markdown.value = "";
	var result = document.getElementById('result');
	
	result.innerHTML = "";
}

function encode(text) {
  var newText = text.replace(/</g, "&lt;");
  return newText.replace(/>/g, "&gt;");
}

var renderer = new marked.Renderer();
renderer.paragraph = function(text) {
  return '<p>' + text + '</p>\n\n';
};

marked.setOptions({ 
  renderer: renderer, 
  gfm: true 
});

function processMarkdown() {
  resultDiv.innerHTML = "";
	renderedMarkdown = encode(marked(markdownTextBox.value));
	resultDiv.innerHTML = renderedMarkdown;
}


document.getElementById("markdown").addEventListener('keyup', function(){console.log("Keyup called");});
document.getElementById("markdown").addEventListener('keyup', processMarkdown);
document.getElementById("clear").addEventListener('click', clearAll);
document.getElementById("copy").addEventListener('click', copyToClipBoard);
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
var RAW = true;

/*
* Functions
*/

function processMarkdown() {
  resultDiv.innerHTML = ""; // This helps the rendering
	renderedMarkdown = RAW ? encode(marked(markdownTextBox.value)) : marked(markdownTextBox.value);
	resultDiv.innerHTML = renderedMarkdown;
}

function copyToClipBoard() {
  $('#displayType').prop('checked', true);
  $('#output').addClass('raw');
  RAW = true;
  processMarkdown();
	var range = document.createRange();
	range.selectNodeContents(resultDiv);
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



 $('#displayType').on('change', function(){
   if($(this).is(":checked")) {
     $('#output').addClass('raw');
     RAW = true;
   } else {
     $('#output').removeClass('raw');
     RAW = false;
   }
   processMarkdown();
 });
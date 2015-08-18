
var KeyCodes = {
  ENTER : 13,
  TAB   : 9
};

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
	markdown.innerHTML = "";
}


document.getElementById("clear").addEventListener('click', clearAll);
document.getElementById("copy").addEventListener('click', copyToClipBoard);

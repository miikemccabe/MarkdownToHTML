
var KeyCodes = {
  ENTER : 13,
  TAB   : 9
};

var listItems = [];

var listType = "ul";

var ListItem = function() {
  /*
  *   Create the <li>
  */
  this.li = document.createElement("li");
  this.li.className = "list-item";
  this.li.contentEditable = "true";
	this.li.tabIndex = "1";
	/*
	*   Attach event handlers
	*/
	this.li.addEventListener('keyup', generateHTML);
	this.li.addEventListener('keydown', function(e) {
	  // Prevents return from adding a <br />
	  if(e.keyCode === KeyCodes.ENTER) {
	    e.preventDefault();
	    createListItem();
	  }
	});
	/*
	*   Add the <li> to the dom
	*/
  document.getElementById("list-inputs").appendChild(this.li);
	
	/*
	*   Create ListItem methods
	*/
	this.focus = function() {
	  this.li.focus();
	};
  
  this.isEmpty = function() {
    return this.li.innerHTML === "";
  };
  
  this.getValue = function() {
    return this.li.innerHTML;
  };
  
  this.remove = function() {
    // The try/catch is because of a weird thing
    // where the div is no longer a child of the
    // parentNode but the parentNode is still a
    // parent of the child. Or something like
    // that. Anyway this stops it.
    try {
      if(this.li.parentNode) {
        this.li.parentNode.removeChild(this.li);
      }
    } catch(e) {
        console.log(e.toString());
    }
    
    // Remove it from the global list of listItems
  	for(var i=0, l=listItems.length; i<l; i++) {
  		if(listItems[i] === this) {
  		  listItems.splice(i, 1);
  		}
  	}
    
  };
  
};

function createListItem() {
  if(listItems.length === 0 || allListItemsFilled()) {
    var newItem = new ListItem();
    listItems.push(newItem);
    newItem.focus();
	  generateHTML();
  }
}

function removeEmptyListItems() {
  var listItemsCount = listItems.length - 1;
	for(var i=listItemsCount; i>0; i--) {
		if(listItems[i].isEmpty()) {
		  // If it's the activeElement don't remove it
		  if(listItems[i].li !== document.activeElement) {
		    listItems[i].remove();
		  }
		}
	}
}

function allListItemsFilled() {
	for(var i=0, l=listItems.length; i<l; i++) {
		if(listItems[i].isEmpty()) {
		  return false;
		}
	}
	return true;
}

function generateHTML() {
	
	// Clean up any empty
	removeEmptyListItems();
  
	var list = "<" + listType + ">" + "\n";
	listItems.forEach(function(item) {
	  if(!item.isEmpty()) {
			list += "   <li>" + item.getValue() + "</li>\n";
	  }
	});
	list += "</" + listType + ">";
	
	document.getElementById("result").innerHTML = encode(list);
	
}

function clearAll() {
	while(listItems.length > 0) {
		listItems[0].remove();
	}
	// We always need 1 listItem
	createListItem();
}

function copyToClipBoard() {
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


function encode(text) {
  var newText = text.replace(/</g, "&lt;");
  return newText.replace(/>/g, "&gt;");
}

/* onload */

  createListItem();
  document.getElementById("clear").addEventListener('click', clearAll);
  document.getElementById("copy").addEventListener('click', copyToClipBoard);
 
 
 $('#listType').on('change', function(){
   var $list = $('#list-inputs');
   if($(this).is(":checked")) {
     $list.removeClass('ol');
     listType = "ul";
   } else {
     $list.addClass('ol');
     listType = "ol";
   }
   generateHTML();
 });

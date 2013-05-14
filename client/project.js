var getProjectsCat = function(catName){
	return Categories.find( { "type": catName, "project" : Session.get("currentProject")._id }, {sort : {"sort" : 1} });
}

var subscribeCats =  function(){
	return Meteor.subscribe("categories", function(){
		Template.project.tatics = function(){
			return getProjectsCat("Tatic");
		}

		Template.project.objectives = function(){
			return getProjectsCat("Objective");
		}

		Template.project.strategies = function(){
			return getProjectsCat("Strategy");
		}

		Template.project.goals = function(){
			return getProjectsCat("Goal");
		}

		Template.project.pending = function(){
			return getProjectsCat("Pending");
		}
	});
}

catSubscription = subscribeCats();


/* Helpers */
var SetCaretAtEnd = function(elem) {
    var elemLen = elem.value.length;
    // For IE Only
    if (document.selection) {
        // Set focus
        elem.focus();
        // Use IE Ranges
        var oSel = document.selection.createRange();
        // Reset position to 0 & then set at end
        oSel.moveStart('character', -elemLen);
        oSel.moveStart('character', elemLen);
        oSel.moveEnd('character', 0);
        oSel.select();
    }
    else if (elem.selectionStart || elem.selectionStart == '0') {
        // Firefox/Chrome
        elem.selectionStart = elemLen;
        elem.selectionEnd = elemLen;
        elem.focus();
    } // if
} // SetCaretAtEnd()

var updateItemLocation = function(mid,newCat,sort){
	Categories.update(
	   { _id: mid },
	   {
	     //$set: { 'type': newCat, 'top': top, 'left': left},
	     $set: { 'type': newCat, 'sort': sort },
	   }
	)
}

Template.project.rendered = function(){
	var currentCat;
	$('.cat').sortable({
      connectWith: ".cat",
      start: function(event,ui){
      	currentCat = $(ui.item).parent().attr("id");
      },
      stop: function(event,ui){
      	//catSubscription.stop();
      	var item = $(ui.item);
      	var newCat = item.parent().attr("id");
      	$.each(item.parent().children(), function(i,val){
      		var itemId = $(val).attr("item_id");
      		//console.log(newCat);
      		//console.log(i);
      		//console.log(itemId);
      		updateItemLocation(itemId,newCat,i);
      	});
      	if (newCat !== currentCat){
	      	item.remove();
      	}
      	currentCat = undefined;
      	//catSubscription = subscribeCats();
      }
    });
}

Template.project.events({
	'dblclick .item' : function(event,template){
		var item = $(event.toElement);
		item.hide();
		item.parent().children(".item-text-input").show();
		SetCaretAtEnd(item.parent().children(".item-text-input")[0]);
		return;
	},
	'blur .item-text-input' : function(event,template){
		var item = $(event.srcElement);
		var newText = item.val();
		var mid = item.parent().attr("item_id");
		var oldText = item.parent().children(".item-text").text();
		item.parent().children(".item-text").text(newText);
		item.hide();
		item.parent().children(".item-text").show();
//		console.log(mid);
//		console.log(oldText);
//		console.log(newText);
		Categories.update(
			{_id: mid},
			{
				$set: { Description: newText}, 
				$push: { History: oldText } 
			}
		);
	}
});

var projectsHandle = Meteor.subscribe('projects', function(project_id){
  	var project = Projects.findOne({"_id": Session.get("currentProjectId") });
 	Session.set('currentProject', project);
});

Template.project.isProjectLoading = function(){
	return !projectsHandle.ready();
};

Template.project.currentProject = function(){
	return Session.get('currentProject');
};

Template.project.currentUser = function(){
  return Meteor.user();
};
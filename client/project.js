
/* Helpers */

var updateItemLocation = function(mid,newCat,sort){
	Categories.update(
	   { _id: mid },
	   {
	     //$set: { 'type': newCat, 'top': top, 'left': left},
	     $set: { 'type': newCat, 'sort': sort },
	   }
	)
}

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

Template.project.rendered = function(){
	var newCat;
	/*$('.item').draggable({
		revert: "invalid",
		stop: function(event,ui){
			console.log(ui.offset);
			console.log(ui.position);
			console.log(newCat);
			updateItemLocation($(this).attr("item_id"),newCat);
			//$(this).css({"position":"absolute","x":ui.offset.x + "px","y":ui.offset.y +"px"});
			//$('#' + newCat).append(ui.helper);
		}
	});
	$('.cat').droppable({
		accept:".item",
		drop: function(event,ui){
			newCat = $(this).attr("id");
		}
	});*/
	$('.cat').sortable({
      connectWith: ".cat",
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
      	item.remove();
      	//catSubscription = subscribeCats();
      }
    });

}

/*stop: function( event, ui ) {
			var newCat = $(ui.helper).parent().attr("id");
			var top = ui.position.top;
			var left = ui.position.left;
			var mid = $(ui.helper).attr("item_id");
			updateItemLocation(mid,newCat,top,left);
		}*/
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
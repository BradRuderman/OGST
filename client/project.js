
/* Helpers */

var updateItemLocation = function(mid,newCat,top,left){
	Categories.update(
	   { _id: mid },
	   {
	     $set: { 'type': newCat, 'top': top, 'left': left},
	   }
	)
}

var getProjectsCat = function(catName){
	return Categories.find( { "type": catName, "project" : Session.get("currentProject")._id }, {sort : {"sort" : 1} });
}

Meteor.subscribe("categories", function(){
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

Template.project.rendered = function(){
	$('.item').droppable({
		accept:".cat"
	});
	$('.item').draggable({
		helper: "clone"
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

/* Helpers */

var updateItem = function(mid,newCat){
	item = Categories.find({_id: mid}).fetch();
	console.log(item);
	Categories.update(
	   { _id: mid },
	   {
	     $set: { 'type': newCat },
	     $push: { 'history': item },
	   }
	)
}

var getProjectsCat = function(catName){
  return Categories.find( { "type": catName, "project" : Session.get("currentProject") })
};

/* Template Projects */

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

Template.project.rendered = function(){
	$('.cat').sortable({ connectWith: ".cat", stop: function( event, ui ) {
		var newCat = ui.item.parent().attr('id');
		var id = ui.item.attr('item_id');
		console.log('item_id' + id.toString());
		updateItem(id,newCat);
	}});
}

/* Template Add Dialoag Box */

Template.addDialog.category = function(){
  return Session.get("showAddDialog");
};

Template.addDialog.events({
  'click .save': function (event, template) {
    Categories.insert({
      type: Session.get("showAddDialog"),
      user: Session.get("name"),
      project: Session.get("currentProject"),
      Description: template.find(".description").value.trim()
    });
    Session.set("showAddDialog",false);
  },

  'click .cancel': function () {
    Session.set("showAddDialog", false);
  }
});
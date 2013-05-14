Projects = new Meteor.Collection("projects");
Categories = new Meteor.Collection("categories");


Meteor.methods({
  addNewUserItem: function (name, project, description, type) {
  	//console.log("desc:" + description.trim().length);
    if (description.trim().length <= 0 ) {
	    throw new Meteor.Error(400, "Description can't be empty!");
    }
    return Categories.insert({
	      type: type,
	      user: name,
	      project: project,
	      Description: description
    });
  }
});


Projects.allow({
	insert: function (userId, doc){
		if (! userId) {
			return false;
		}
		return true;
	},
	update: function (userId, doc, fields, modifier){
		if (! userId) {
			return false;
		}
		return true;
	},
	remove: function (userId, doc){
		return false;
	}
});

Categories.allow({
	insert: function(userId, doc){
		return true;
	},
	update: function(userId, doc, fields, modifier){
		if (!userId) {
			return false;
		}
		return true;
	},
	remove: function(userId,doc){
		if (!userId) {
			return false;
		}
		return true;
	}
});


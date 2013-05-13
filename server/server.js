
Meteor.methods({
  addNewUserItem: function (name, project, description, type) {
  	console.log("desc:" + description.trim().length);
    if (description.trim().length > 0 )
    {
	    Categories.insert({
	      type: type,
	      user: name,
	      project: project,
	      Description: description
	    });
    }
    else
    {
    	return "Description can't be empty!";
    }
  }
});

Meteor.startup(function () {
	if (Meteor.users.find().count() === 0) {
	  Accounts.createUser({"email":"admin@test.com", "password":"test"});
	}
});

Meteor.publish("projects", function () {
    return Projects.find();
});

Meteor.publish("categories", function(){
	return Categories.find();
});


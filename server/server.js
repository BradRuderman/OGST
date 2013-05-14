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


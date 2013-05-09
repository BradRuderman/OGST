/* Template View Projects */
Template.viewProjects.currentProject = function(){
  return Session.get("currentProject");
};

/* Template AdminLogin */

Template.adminLogin.events({
  'click #admin-login': function(event, template){
    var password = template.find("#admin-password").value.trim();
    Meteor.loginWithPassword("admin@test.com", password, function(){
    	Session.set("name", Meteor.user().emails[0].address);
    });
  },
  'click #new-project': function(event, template){
  	
  }
})


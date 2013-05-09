/* Template View Projects */
Template.viewProjects.currentProject = function(){
  return Session.get("currentProject");
};

/* Template AdminLogin */

Template.adminLogin.events({
  'click #admin-login': function(event, template){
    var password = template.find("#admin-password").value.trim();
    Meteor.loginWithPassword("admin@test.com", password, function(){
    });
  }
})

/* Template Admin */

Template.admin.events({
  'click #admin-logout': function(event, template){
  	Meteor.logout();
  }
})
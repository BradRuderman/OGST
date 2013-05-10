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
  }
})

Template.admin.events({
  'click #new-project': function(event, template){    
    Session.set("showAddProject","true"); 
  }
});

Template.addDialogNewProject.rendered = function(){
  $(".datepicker" ).datepicker();
};

Template.admin.currentUser = function(){
  return Meteor.user();
};

Template.admin.showAddProject = function(){
  return Session.get("showAddProject");
};

Template.addDialogNewProject.events({
  'click .cancel' : function(event, template){
    Session.set("showAddProject", null);
  },
  'click #save-project' : function(event, template){
    var name = template.find("#project-name").value.trim();
    var startDate = new Date(template.find("#start-date").value.trim());
    var endDate = new Date(template.find("#end-date").value.trim());
    Projects.insert({
      "name" : name,
      "start" : startDate,
      "end" : endDate
    });
    Session.set("showAddProject", null);
  }
});
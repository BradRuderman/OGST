var Router = Backbone.Router.extend({
  routes: {
    "":                 "user", 
    "admin":            "admin",
    "project/:project_id":         "project"
  },

  user: function() {
    // Your homepage code
    // for example: Session.set('currentPage', 'homePage');
    Session.setDefault('currentProject', null);
    Session.set('currentPage','user');
  },

  admin: function() {
    // Help page
    Session.setDefault('currentProject', null);
    Session.set('currentPage','admin');
  },

  project: function(project_id){
    Session.set('currentPage','project');
    Session.set('currentProjectId', project_id);
  }
});
var app = new Router;
Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});


/* Template Page */
Template.page.showAddDialog = function () {
  return Session.get("showAddDialog");
};


/* Template Project List Drop Down */
Template.projectsListDd.projects = function(){
  return Projects.find();
};

Template.projectsListDd.events({
  'change #project' : function(event,template){
    var project_id = template.find("#project").value.trim();
    var project = Projects.findOne({"_id": project_id });
    Session.set("currentProject", project);
    if (Session.get("currentPage") === "admin")
    {
      app.navigate("/project/" + project._id.toString(), { "trigger" : true });
    }
  }
});

/* Template Page */
Template.page.currentPageIs = function(page){
  return Session.get("currentPage") === page;
};

Template.page.full_name = function(){
  return Template.projectsList.full_name();
};

Template.page.isNameSet = function(){
  return Template.user.isNameSet();
};


Template.page.events({
  'click #logout' : function(event,template){
    Session.set("name",null);
    Session.set("currentProject",undefined)
    Meteor.logout();
  }
})

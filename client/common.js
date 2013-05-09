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
    if (Meteor.user() !== null || project_id === null){
      Session.set('currentPage','project');
      Session.set('currentProject', project_id);
    }
    else{
      Session.set('currentPage','admin');
    }   
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
    var project = template.find("#project").value.trim();
    Session.set("currentProject", project);
    if (Session.get("currentPage") === "admin")
    {
      app.navigate("/project/" + project.toString(), { "trigger" : true });
    }
  }
});

/* Template Page */
Template.page.currentPageIs = function(page){
  return Session.get("currentPage") === page;
};

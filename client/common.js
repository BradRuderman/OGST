var Router = Backbone.Router.extend({
  routes: {
    "":                 "user", 
    "admin":            "admin",
    "project/:project_id":         "project"
  },

  user: function() {
    // Your homepage code
    // for example: Session.set('currentPage', 'homePage');
    //Session.setDefault('currentProject', null);
    Session.set('title', "OGST");
    //Session.set('currentCategory', null);
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
  Session.setDefault("title", "OGST");
  Backbone.history.start({pushState: true});
});


/* Template Page */
Template.page.showAddDialog = function () {
  return Session.get("showAddDialog");
};


/* Template Project List Drop Down */
Template.projectsListDd.projects = function(){
  if (Session.get('currentPage') === 'admin'){
    return Projects.find();
  }
  return Projects.find({"visible":true});
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


Template.nav.events({
  'tap, click .cat-back' : function(event,template){
    Session.set("currentCategory",null);
    Session.set("title", "OGST");
  }
});

Template.nav.back = function(){
  return Session.get("currentCategory");
};

Template.nav.title = function(){
  return Session.get("title");
}

Template.footer.full_name = function(){
  return Template.projectsList.full_name();
};

Template.footer.isNameSet = function(){
  return Template.user.isNameSet();
};


/* Template Page */
Template.page.currentPageIs = function(page){
  return Session.get("currentPage") === page;
};

Template.page.events({
  'click #logout' : function(event,template){
    Session.set("name",null);
    Session.set("currentProject",undefined)
    Meteor.logout();
    app.navigate("/", {"trigger" : true});
  }
})

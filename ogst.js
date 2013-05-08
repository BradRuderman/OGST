Projects = new Meteor.Collection("projects");
Categories = new Meteor.Collection("categories");

if (Meteor.isClient) {
  var getListCount = function(typeName){
    return Categories.find( { "type": typeName, "user" : Session.get("name"), "project" : Session.get("currentProject") }).count();
  };

  Template.categories.categories_list = [
      {
        name: "Objective",
        count: function(){
          return getListCount("Objective");
        }
      }, 
      {
        name: "Goal", 
        count: function(){
          return getListCount("Goal");
        }
      },
      {
        name: "Strategy",
        count: function(){
          return getListCount("Strategy");
        }
      },
      {
        name: "Tatic",
        count: function(){
          return getListCount("Tatic");
        }
      }
    ];

  Template.intro.isNameSet = function(){
    return Template.intro.full_name() != undefined && Template.intro.full_name().toString().trim() != "";
  };

  Template.intro.full_name = function(){
    return Session.get("name");
  };

  Template.intro.events({
    'click #name-submit' : function (event,template) {
      Session.set("name",template.find("#full-name").value.trim());
    }
  });

  Template.projectsList.projects = function(){
    return Projects.find();
  };

  Template.projectsList.events({
    'change #project' : function(event,template){
      Session.set("currentProject", template.find("#project").value.trim())
    },
    'click .category' : function(event,template){
      Session.set("showAddDialog",$(event.target).attr('id'));
    }
  });

  Template.projectsList.current = function(){
    return Session.get("currentProject");
  };

  Template.page.showAddDialog = function () {
    return Session.get("showAddDialog");
  };

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

}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

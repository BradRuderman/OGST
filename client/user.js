/* Template User */


Template.user.isNameSet = function(){
  return Template.projectsList.full_name() != undefined && Template.projectsList.full_name().toString().trim() != "";
};

Template.user.events({
  'click #name-submit' : function (event,template) {
    Session.set("name",template.find("#full-name").value.trim());
  },
  'keypress #full-name' : function(event,template){
    if (event.charCode === 13)
    {
      Session.set("name",template.find("#full-name").value.trim());
    }
  }
});


/* Template Categories */


var getListCount = function(typeName){
  return Categories.find( { "type": typeName, "user" : Session.get("name"), "project" : Session.get("currentProject")._id }).count();
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

Template.categories.events({
  'click .category' : function(event,template){
    Session.set("showAddDialog",$(event.currentTarget).attr('id'));
  }
});


/* Template ProjectList */
Template.projectsList.current = function(){
  return Session.get("currentProject");
};

Template.projectsList.full_name = function(){
  if (Meteor.user() != undefined)
  {
    return Meteor.user().emails[0].address;
  }
  return Session.get("name");
};

/* Template Add Dialog Box */

Template.addDialog.category = function(){
  return Session.get("showAddDialog");
};

Template.addDialog.addDialogError = function(){
  return Session.get("addDialogError");
};

Template.addDialog.events({
  'click .save': function (event, template) {
    Meteor.call("addNewUserItem", Session.get("name"), Session.get("currentProject")._id, template.find(".description").value.trim(), Session.get("showAddDialog"),function(error, result){
      console.log(result);
      if (result != undefined)
      {
        Session.set("addDialogError", result);
      }
      else
      {
        Session.set("showAddDialog",false);
        Session.set("addDialogError", undefined);        
      }
    });
  },

  'click .cancel': function () {
    Session.set("showAddDialog", false);
  }
});


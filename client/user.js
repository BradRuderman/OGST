/* Template User */


Template.user.isNameSet = function(){
  return Template.projectsList.full_name() != undefined && Template.projectsList.full_name().toString().trim() != "";
};

Template.user.events({
  'click #name-submit' : function (event,template) {
    Session.set("name",template.find("#full-name").value.trim());
  }
});


/* Template Categories */


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
  return Session.get("name");
};

/* Template Add Dialoag Box */

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


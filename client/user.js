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
    Session.set("showAddDialog",$(event.target).attr('id'));
  }
});


/* Template ProjectList */
Template.projectsList.current = function(){
  return Session.get("currentProject");
};

Template.projectsList.full_name = function(){
  return Session.get("name");
};



/* Template User */


Template.user.isNameSet = function(){
  return Template.projectsList.full_name() != undefined && Template.projectsList.full_name().toString().trim() != "";
};

Template.user.events({
  'click #name-submit' : function (event,template) {
    window.scrollTo(0,0)
    //alert('hi');
    Session.set("name",template.find("#full-name").value.trim());
  },
  'keypress #full-name' : function(event,template){
    if (event.charCode === 13){
      Session.set("name",template.find("#full-name").value.trim());
    }
  }
});


/* Template Categories */


var getList = function(typeName){
  return Categories.find( { "type": typeName, "user" : Session.get("name"), "project" : Session.get("currentProject")._id }, {sort: {date_created: -1}});
};

Template.categories.categories_list = [
    {
      name: "Objective",
      items: function(){
        return getList("Objective");
      },
      count: function(){
        return getList("Objective").count();
      }
    }, 
    {
      name: "Goal", 
      items: function(){
        return getList("Goal");
      },
      count: function(){
        return getList("Goal").count();
      }
    },
    {
      name: "Strategy",
      items: function(){
        return getList("Strategy");
      },
      count: function(){
        return getList("Strategy").count();
      }
    },
    {
      name: "Tatic",
      items: function(){
        return getList("Tatic");
      },
      count: function(){
        return getList("Tatic").count();
      }
    }
  ];

Template.categories.events({
  'click .category' : function(event,template){
    var cat = $(event.currentTarget).attr('id');
    Session.set("currentCategory", cat);
    Session.set("title", cat);
  }
});

Template.categories.currentCategory = function(){
  return Session.get("currentCategory");
};

Template.catCard.currentCategory = function(){
  return Session.get("currentCategory");
}

Template.catCard.currentCategoryInitial = function() {
  return Session.get("currentCategory").trim().substring(0,1);
};

Template.catCard.events({
  "tap .remove-card" : function(event,template){
    var itemId = $(event.srcElement).parent().parent().attr("item_id");
    Meteor.call("removeUserItem",this.user, itemId, function(error, result){
    });
  }
});

Template.categoryAdd.items = function(){
  return getList(Session.get("currentCategory"));
};

Template.categoryAdd.events({
  "click .save" : function(event,template){
    Meteor.call("addNewUserItem", Template.projectsList.full_name(), Session.get("currentProject")._id, template.find("#cat-text").value.trim(), Session.get("currentCategory"),function(error, result){
      if (error !== undefined){
        Session.set("addNewUserItemError", error.reason);
      }
      else{
        $('#cat-text').val('');
        Session.set("addNewUserItemError", undefined);        
      }
    });
  }
});

Template.categoryAdd.categoryAddError = function(){
  return Session.get("addNewUserItemError");
};

/* Template ProjectList */
Template.user.current = function(){
  return Session.get("currentProject");
};

Template.projectsList.full_name = function(){
  if (Meteor.user() != undefined)
  {
    return Meteor.user().emails[0].address;
  }
  return Session.get("name");
};


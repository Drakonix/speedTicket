  // This code only runs on the client
  Meteor.subscribe("cars");

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Template.body.helpers({
    carsCount: function () {
      return Cars.find().count();
    },
    cars: function() {
      return Cars.find();
    }
  });

  Template.body.events({
    "submit .new-car": function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        var code = event.target.code.value;
        var immat = event.target.immat.value;
        // Insert a task into the collection
        Meteor.call("addCar", code, immat);
        // Clear form
        event.target.code.value = "";
        event.target.immat.value = "";
      }
    });

  Template.car.helpers({
  });

  Template.car.events({
    "click .delete": function () {
      Meteor.call("deleteCar", this._id);
    }
  });

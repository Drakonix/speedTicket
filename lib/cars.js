Cars = new Mongo.Collection('cars');

Meteor.methods({
  addCar: function (code, immat) {
    // Make sure the user is logged in before inserting a task
    /*if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }*/

    if (!code) {
      throw new Meteor.Error("not-authorized");
    }
    if (!immat ) {
      throw new Meteor.Error("not-authorized");
    }

    var car = Cars.findOne( {"immat" : immat, "code" : code });
    if(car){
      throw new Meteor.Error("car already exist");
    }

    Cars.insert({
      code: code,
      immat: immat,
      createdAt: new Date(),
      owner: Meteor.userId()
    });
  },
  deleteCar: function (carId) {
    var car = Cars.findOne(carId);
    if (car.owner !== Meteor.userId()) {
      //make sure only the owner can delete the car
      throw new Meteor.Error("not-authorized");
    }
    Cars.remove(carId);
  }
  /*,
  setChecked: function (taskId, setChecked) {
    var task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: { checked: setChecked} });
  },
  setPrivate: function (taskId, setToPrivate) {
    var task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  }*/
});

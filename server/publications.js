// Only publish cars that are public or belong to the current user
Meteor.publish("cars", function () {
  return Cars.find({owner: this.userId});
});

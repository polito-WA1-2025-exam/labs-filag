import "Bowl.mjs"
import "User.mjs"

const dayjs = require('dayjs');

function Order(user) {
  this.bowls = [];
  this.date = dayjs();
  this.price = 0;
  this.user = user;

  this.addBowl = function (bowl) {
    this.bowls.push(bowl);
    this.price += bowl.price;
  }

}
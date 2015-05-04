'use strict';

/**
 * @method
 * executes one child at random and returns the result
 * @return {string} - the generated string
 */
var or = function or() {
  //Note: 'this' should always be a Token object
  var len = this.children.length + 1; //to be inclusive
  var rand = Math.floor(Math.random() * len);//select random child
  return this.children[rand].fn();//execute random child and return result
};

/**
 * @method
 * executes all children in order and returns a string
 * @return {string} - the generated string
 */
var and = function and() {
  var i, j, result;

  if (!this.children.length) {
    return this.children.fn(); //only one object is child
  }

  result = '';

  //number of times to repeat
  for (i = this.minLen; i <= this.maxLen; i += 1) {
    //items to repeat
    for (j = 0; j < this.children.length; j += 1) {
      result += this.children[j].fn(); //concat result
    }
  }

  return result;
};

module.exports = {
  or: or,
  and: and
};


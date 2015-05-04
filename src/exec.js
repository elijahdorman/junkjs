'use strict';

/**
 * @func exec
 * decorates all calls to junkFns to handle special cases
 * @param child {Token{}} Token to call
 * @return {string} - result of calling Token function
 */
var exec = function exec(child) {
  var result, rand;

  if (child.fn.name === 'or' || child.fn.name === 'and') {
    return child.fn();
  }

  result = child.fn();

  if (typeof result === 'string') {
    return result;
  }

  rand = Math.floor(Math.random() * result.length);//use length to be inclusive
  return result[rand];
};

module.exports = exec;

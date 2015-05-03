'use strict';

/**
 * @constructor Token
 * Constructs Token objects
 * @param kind {String} type of token
 * @param fn {Function} function to execute for value
 * @param minLen {Number} min times to iterate (min: 0; default: 1)
 * @param maxLen {Number} max times to iterate (min: minLen; default: minLen)
 * @param children {null|Token|Token[]} potential children
 * @return {Token{}} returns Token object
 */
var Token = function (kind, parent, fn, children,  maxLen, minLen) {
  this.kind = kind; //'or', 'and', 'func', 'char'
  this.parent = parent;
  this.fn = fn;
  this.children = children !== undefined ? children : null;
  this.hasUserLen = (minLen || maxLen) ? true : false;//let us know if the user set the values
  this.minLen = (typeof minLen === 'number' && minLen >= 0) ? minLen : 1;
  this.maxLen = (typeof maxLen === 'number' && maxLen >= minLen) ? maxLen : minLen;
};

module.exports = Token;


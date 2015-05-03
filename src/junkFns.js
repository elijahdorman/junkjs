'use strict';
/*
 * This is a list of primitive functions
 * that may be accessed using :name: syntax
 * (some have ~L style shortcuts as well)
 *
 * This is user extensible. Nname gets the
 * complement of whatever thing (eg. alpha
 * gets any alphanumeric char, but Nalpha
 * gets any NON-alphanumeric char)
 */

/**
switch (kind) {
  case 'l': match = lower;
  case 'L': match = upper + number + symbol;
  case 'u': match = upper;
  case 'U': match = lower + number + symbol;
  case 'n': match = number;
  case 'N': match = lower + upper + symbol;
  case 's': match = symbol;
  case 'S': match = lower + upper + number;
  case 'c': match = lower + upper + number + symbol;
  case 'C': match = ' ';
  case 'r': match = number + symbol;
  case 'R': match = upper + lower;
  case 'z': match = lower + symbol;
  case 'Z': match = upper + symbol;
  case 'u': match = lower + number;
  case 'U': match = upper + number;
}
    'l': ':lower:',
    'L': ':Nlower:',
    'u': ':upper:',
    'U': ':Nupper:',

    's': ':punct:',
    'S': ':alnum:',
    'n': ':digit:',
    'N': ':Ndigit:',

    'z': ':lowerPunct:',
    'Z': ':upperPunct:',
    'c': ':alnumPunct:',
    'C': ':space:'
*/

//helper alphabets
var lower = "abcdefghijklmnopqrstuvwxyz";
var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var number = "0123456789";
var symbol = "~`!@#$%^&*()-_=+[{]}|:;,<.>/?'\\\"";

var lowerArr = lower.split('');
var upperArr = upper.split('');
var numberArr = number.split('');
var symbolArr = symbol.split('');



//alphanumeric
var alpha = function () { return lowerArr.concat(upperArr, numberArr); };

var symbol = function () { return symbolArr; };

//host domains
var domain = function () {
  return [
    //common names
    '.com', '.org', '.net', '.edu', '.info', 
    '.gov', '.mil', '.biz', '.int', '.me', '.co',
    //common countries (supposedly according to Google)
    '.io', '.ca', '.us', '.uk', '.jp', '.es', '.de',
    '.fr', '.au', '.ru', '.ch', '.it', '.nl', '.se', '.no'
  ];
};

module.exports = {
  alpha: alpha,
  symbol: symbol,
  domain: domain
};


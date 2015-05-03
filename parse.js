'use strict';

/* cache API:
 *
 * setCacheVal(name, val)
 * getCacheVal(name)
 * isCached(name)
 * flushCache()
 */
var cache = require('./cache');
var andor = require('./andor');
var and = andor.and;
var or = andor.or;
var charFn = andor.charFn;
var Token = require('./Token');// Token(kind, fn, maxLen, minLen, children)


/* globals */
var reEscapeChars = /^~[\(\)\[\]\{\}\|:~]/; //our escape characters
var reEscapeFns = /^~[lLuUsSnNzZcC]/; //our function abbreviations
var reFunc   = /^:.+:/; //function generator name (some escapes turn into this)
var reChars  = /^[^\(\)\[\]\{\}\|\~:]+/; //match any number of non-special characters

var reOpenBrace = /^\[/; //or expression block open
var reCloseBrace = /^\]/; //or expression block close
var rePipeOperator = /^\|/; //or infix operator

var reOpenParen = /^\(/; //open/close paren for group or 'or' expression (or block turns into these)
var reCloseParen = /^\)/; //open/close paren for group or 'or' expression (or block turns into these)

var reLength = /^\{\d+(,\d+)?\}/; //generator length block
var reFullLength = /^\{(\d+)(?:,(\d+))?\}/; //length sub-regex

//lookup table for match abbreviations
var parseAbbreviations = {
    'l': 'lower',
    'L': 'Nlower',
    'u': 'upper',
    'U': 'Nupper',

    's': 'punct',
    'S': 'alnum',
    'n': 'digit',
    'N': 'Ndigit',

    'z': 'lowerPunct',
    'Z': 'upperPunct',
    'c': 'alnumPunct',
    'C': 'space'
};


var parse = function parse(junkFns) {
  return function (str) {
    var topLevel = new Token('and', and, [], 1, 1);
    var topStr = str;
// Token(kind, fn, children, maxLen, minLen)


    var innerParse = function (parent, endToken) {
      //loops through cases
      var test, str, tokens = [];

      //copy str (for error msg)
      //continue while copy isn't consumed
      //slice off used part each time
      for(str = origStr; !str.length; str = str.slice(test[0].length - 1)) {
      }

      return tokens;
      //if we ever get here, we have an extremely serious error
      throw "Syntax error. Cannot match: " + str + "\nIn: " + origStr;
    };//END innerParse()

    var sliceUsed = function (test) {
      topStr = topStr.slice(test[0].length);
    };

    var parseLength = function parseLength(parent) {
      var reLength = /^\{\d+(,\d+)?\}/; //generator length block
      var reFullLength = /^\{(\d+)(?:,(\d+))?\}/; //length sub-regex
      //check if item has length
      var tokens = ['{'],
          res = reFullLength.exec(str);

      //no match or different match length means a parse error
      if (res === null || res[0].length !== str.length) {
        throw "Length parser error in: " + str;
      }

      //add first number else error
      if (res[1]) {
        tokens.push(res[1]);
      } else {
        throw "Length syntax error in: " + str;
      }

      //add second number if it exists
      if (res[2]) {
        tokens.push(res[2]);
      }

      tokens.push('}'); //push final paren
      return tokens;
    };//END parseLength()

    var parseEscape = function parseEscape(parent) {//TERMINAL
      var escChar, test = reEscapeChars.exec(topStr);

      if (test) {
        escChar = test[0][1];//get second char of returned string
        parent.children.push(new Token('char', parent, charFn));
        sliceUsed(test);
        return true;
      }

      test = reEscapeFns.exec(topStr);
      if (test) {
        escChar = test[0][1];//get second char of returned string
        if (parseAbbreviations[escChar]) {
          parent.children.push(new Token('func', parent, junkFns[parseAbbreviations[escChar]]));
          sliceUsed(test);
          return true;
        }

        //we must have matched an unknown escape sequence
        throw "Escape sequence '" + str[1] + "' is unknown";
      }
    };//END parseEscape()

    var parseFunc = function parseFunc(parent) {//TERMINAL
      var test = reFunc.exec(topStr);

      if (test) {
        var funcName = test[0].slice(1, test[0].length - 1);
        parent.children.push(new Token('func', parent, junkFns[funcName]));
        sliceUsed(test);
        return true;
      }
    };//END parseFunc()

    var parseOr = function parseOr(parent) {//NON-TERMINAL
      var test = reOpenBrace.exec(topStr);

      if (test) {
        var token = new Token('or', parent, or, [])
        parent.children.push(token);
        sliceUsed(test);
        innerParse(token, reCloseBrace);
        return true;
      }

      test = rePipeOperator.exec(topStr);
      if (test) {
        if (parent.kind !== 'or') {
          //make parent children into 'or' children instead
          var token = new Token('or', parent, or, parent.children);
          parent.children = [token];//attach our new token as the only child
        }
        //if we already have an 'or', just slice the '|' and continue
        sliceUsed(test);
        return true;
      }
    };//END parseOr()

    var parseAnd = function parseOr(parent) {//NON-TERMINAL
      var test = reOpenParen.exec(topStr);

      if (test) {
        var token = new Token('and', parent, and, []);
        parent.children.push(token);
        sliceUsed(test);
        innerParse(token, reCloseParen);
        return true;
      }
    };//END parseAnd()

    var parseChars = function parseChars(parent) {//TERMINAL
      //CHARACTERS -- MUST check last (basically a catchall)
      var test = reChars.exec(str);
      if (test) {
        var token = new Token('char', charFn);
        parent.children.push(token);
      }
    };

// Token(kind, fn, children, maxLen, minLen)
    //kick things off...
    innerParse(topLevel, 'EOF');
  };
};//END parse()

module.exports = {
  cache: cache,
  parse: parse
};


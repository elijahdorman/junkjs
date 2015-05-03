'use strict';

var cache = {};

/**
 * @method getCacheVal
 * get cached value else returns undefined
 * @param name {String} name of value to retrieve
 * @param val {Token} Token to cache
 * @returns {undefined}
 */
var setCacheVal = function setCacheVal(name, val) {
  cache[name] = val;
};

/**
 * @method getCacheVal
 * get cached value else returns undefined
 * @param name {String} name of value to retrieve
 * @returns {Token{}} Cached Token
 */
var getCacheVal = function getCacheVal(name) {
  //TODO: consider throwing if not found
  return cache[name];
};

/**
 * @method isCached
 * Checks if value exists in cache
 * @param name {String} name of value to retrieve
 * @returns {Boolean} True if in cache else False
 */
var isCached = function isCached(name) {
  if (cache[name]) {
    return true;
  }
  return false;
};

/**
 * @func prepopulateCache
 * allows us to pre-populate the cache with common
 * strings if we want to later
 * @returns {undefined}
 */
var prepopulateCache = function () {
  //add things like ':email:'
};

/**
 * @method flushCache
 * resets cache -- needed if you overwrite a JunkFn
 * @returns {undefined}
 */
var flushCache = function flushCache() {
  cache = {};
  prepopulateCache();
};


//prepopulate on create
prepopulateCache();

module.exports = {
  setCacheVal: setCacheVal,
  getCacheVal: getCacheVal,
  isCached: isCached,
  flushCache: flushCache
};


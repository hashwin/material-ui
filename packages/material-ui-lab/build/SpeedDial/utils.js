"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrientation = getOrientation;
exports.sameOrientation = sameOrientation;

/**
 * An arrow key on the keyboard
 * @typedef {'up'|'right'|'down'|'left'} ArrowKey
 */

/**
 *
 * @param direction {string}
 * @returns value usable in aria-orientation or undefined if no ArrowKey given
 */
function getOrientation(direction) {
  if (direction === 'up' || direction === 'down') {
    return 'vertical';
  }

  if (direction === 'right' || direction === 'left') {
    return 'horizontal';
  }

  return undefined;
}
/**
 * @param {string} directionA
 * @param {string} directionB
 * @returns {boolean}
 */


function sameOrientation(directionA, directionB) {
  return getOrientation(directionA) === getOrientation(directionB);
}
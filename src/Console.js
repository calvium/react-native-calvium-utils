/**
 * Wrapper for console.log so (a) It can be disabled in production and (b) eslint doesn't complain (c) Chrome debugger
 * statements still show the line and filename of the location of the message
 */
import Utilities from './Utilities';

const noop = () => {};

const isDev = Utilities.isDev();

export default {
  log: isDev
    ? console.log
    : noop,
  warn: isDev
    ? console.warn
    : noop,
  error: isDev
    ? console.error
    : noop,
  group: isDev
    ? (console.group || noop)
    : noop,
  groupCollapsed: isDev
    ? (console.groupCollapsed || noop)
    : noop,
  groupEnd: isDev
    ? (console.groupEnd || noop)
    : noop,
};

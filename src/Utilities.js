/**
 * Return if the app is a dev build or not.
 */
function isDev(): boolean {
  return Boolean(typeof __DEV__ === 'undefined' ? false : __DEV__);
}
export default {isDev};

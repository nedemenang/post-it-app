import { Dispatcher } from 'flux';
import assign from 'object-assign';

/**
   * Dispatcher call
   *
   * @param {function} Dispatcher param
   * @param {null} null
   *
   * @returns {null} null
   */
const AppDispatcher = assign(new Dispatcher(), {
  /**
   * Dispatcher call
   *
   * @param {action} action param
   *
   * @returns {null} null
   */
  handleViewAction(action) {
    const payload = {
      source: 'VIEW_ACTION',
      action
    };
    this.dispatch(payload);
  }
});

export default AppDispatcher;

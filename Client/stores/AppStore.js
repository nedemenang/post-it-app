import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import AppAPI from '../utils/AppAPI.js';

const CHANGE_EVENT = 'change';

const _items = [];

const AppStore = assign({}, EventEmitter.prototype, {
	emitChange() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener(callback) {
		this.on('change', callback);
	},
	removeChangeListener(callback) {
		this.removeListener('change', callback);
	}
});

AppDispatcher.register(payload => {
	const action = payload.action;

	switch(action.actionType){
		
	}

	return true;
});

export default AppStore;
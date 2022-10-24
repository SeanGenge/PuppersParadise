import { useReducer } from 'react';
import {
	UPDATE_LOGGEDINUSER
} from './actions';

export const reducer = (state, action) => {
	switch (action.type) {
		case UPDATE_LOGGEDINUSER:
			return {
				...state,
				loggedInUser: action.user,
			};
		default:
			return state;
	}
};

export function useAppReducer(initialState) {
	return useReducer(reducer, initialState);
}

import { useReducer } from 'react';
import {
	UPDATE_ISLOGGEDIN
} from './actions';

export const reducer = (state, action) => {
	switch (action.type) {
		case UPDATE_ISLOGGEDIN:
			return {
				...state,
				isLoggedIn: action.isLoggedIn,
			};
		default:
			return state;
	}
};

export function useAppReducer(initialState) {
	return useReducer(reducer, initialState);
}

import { useReducer } from 'react';
import {
	UPDATE_ISLOGGEDIN,
	UPDATE_MAPRESULTS
} from './actions';

export const reducer = (state, action) => {
	switch (action.type) {
		case UPDATE_ISLOGGEDIN:
			return {
				...state,
				isLoggedIn: action.isLoggedIn,
			};
		case UPDATE_MAPRESULTS:
			return {
				...state,
				mapResults: action.mapResults
			}
		default:
			return state;
	}
};

export function useAppReducer(initialState) {
	return useReducer(reducer, initialState);
}

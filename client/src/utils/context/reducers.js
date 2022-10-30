import { useReducer } from 'react';
import {
	UPDATE_ISLOGGEDIN,
	UPDATE_MAPRESULTS,
	UPDATE_FRIENDS
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
			};
		case UPDATE_FRIENDS:
			return {
				...state,
				friends: action.friends
			}
		default:
			return state;
	}
};

export function useAppReducer(initialState) {
	return useReducer(reducer, initialState);
}

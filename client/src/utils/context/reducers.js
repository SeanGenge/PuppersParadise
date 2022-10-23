import { useReducer } from 'react';
import {
	UPDATE_ISLOGGEDIN
} from './actions';

export const reducer = (state, {type, payload}) => {
	switch (type) {
		case UPDATE_ISLOGGEDIN: {
			return {
				...state,
				isLoggedIn: payload,
			};
		}
		default:
			return state;
	}
};

export function useAppReducer(initialState) {
	return useReducer(reducer, initialState);
}
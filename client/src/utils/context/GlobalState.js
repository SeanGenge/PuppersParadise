import React, { createContext, useContext } from "react";
import { useAppReducer } from './reducers'

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({ value = [], ...props }) => {
	const [state, dispatch] = useAppReducer({
		// Can also be used to determine if the user is logged in
		isLoggedIn: false,
		// The map results of nearby places
		mapResults: null
	});

	return <Provider value={[state, dispatch]} {...props} />;
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, useAppContext };

import React, { createContext, useContext } from 'react';
import { useAppReducer } from './reducers';

const appContext = createContext();
const { Provider } = appContext;

const AppProvider = ({ value = [], ...props }) => {
	const [state, dispatch] = useAppReducer({
		isLoggedIn: false,
	});

	return <Provider value={[state, dispatch]} {...props} />;
};

const useAppContext = () => useContext(appContext);

export { AppProvider, useAppContext };

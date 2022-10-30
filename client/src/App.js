import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Layout from "./pages/LayoutPage.jsx";
import Home from "./pages/HomePage.jsx";
import NoPage from "./pages/NoPage.jsx";
import FindBuddyPage from './pages/FindBuddyPage.jsx';
import DogFriendlyPlaces from './pages/DogFriendlyPlaces.jsx';
import Login from './pages/LoginPage.jsx';
import Signup from './pages/SignupPage.jsx';
import Profile from './pages/profile/Profile.jsx';
import { AppProvider } from './utils/context/GlobalState';

const httpLink = createHttpLink({
	uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				{/* Our own app provider that will keep track of our state globally */}
				<AppProvider>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="/findbuddy" element={<FindBuddyPage />} />
							<Route path="/dogfriendlyplaces" element={<DogFriendlyPlaces />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="*" element={<NoPage />} />
						</Route>
					</Routes>
				</AppProvider>
			</BrowserRouter>
		</ApolloProvider>
	);
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/LayoutPage.jsx";
import Home from "./pages/HomePage.jsx";
import NoPage from "./pages/NoPage.jsx";
import FindBuddy from './pages/FindBuddy.jsx';
import DogFriendlyPlaces from './pages/DogFriendlyPlaces.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	uri: '/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="/findbuddy" element={<FindBuddy />} />
							<Route path="/dogfriendlyplaces" element={<DogFriendlyPlaces />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="*" element={<NoPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</div>
		</ApolloProvider>
	);
}

export default App;

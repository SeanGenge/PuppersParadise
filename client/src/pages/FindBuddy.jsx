import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/graphql/queries';
import BuddyCard from '../components/BuddyCard';

function FindBuddy() {
	const { data } = useQuery(QUERY_USERS);
	const [users, setUsers] = useState(null);
	
	useEffect(() => {
		if (data && data?.users) {
			setUsers(data.users);
			console.log(users);
		}
	}, [data, setUsers, users]);
	
	useEffect(() => {
		const a = (async () => {
			const b = await fetch("https://api.thedogapi.com/v1/breeds", {
				headers: {
					"x-api-key": "live_e1MQO5WkxfYRvNjWdrazjAxyUNazFVbyCe0CRk7RNcAcNKDo8zx5gqYzV1VN91BD"
				}
			}).then(result => result.json());
		})();
	}, []);
	
	return (
		<div className="container">
			<div className="col s12 center-align">
				<h3>Find a dog buddie</h3>
			</div>
			<div className="col s12 buddy-container">
				{users ? users.map((user, id) => {
				return <BuddyCard key={id} user={user} />
				}) : null}
			</div>
		</div>
	);
}

export default FindBuddy;

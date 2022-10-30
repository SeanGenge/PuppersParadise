import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS, QUERY_ME } from '../utils/graphql/queries';
import BuddyCard from '../components/BuddyCard';

function FindBuddyList() {
	const { data } = useQuery(QUERY_USERS);
	const dataMe = useQuery(QUERY_ME);
	const [users, setUsers] = useState(null);
	const [me, setMe] = useState(null);

	useEffect(() => {
		if (data && data?.users) {
			setUsers(data.users);
		}
	}, [data, setUsers, users]);

	useEffect(() => {
		if (dataMe.data && dataMe.data?.me) {
			setMe(dataMe.data.me);
		}
	}, [setMe, dataMe]);

	return (
		<>
			{users ? users.map((user, id) => {
				// Do not display your dog
				if (user?.email === me?.email) return null;

				return <BuddyCard key={id} user={user} loggedInUser={me} />
			}) : null}
		</>
	);
}

export default FindBuddyList;

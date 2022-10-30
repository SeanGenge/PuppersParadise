import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/graphql/queries';
import BuddyCard from './BuddyCard';
import { useAppContext } from '../utils/context/GlobalState';
import { UPDATE_FRIENDS } from '../utils/context/actions';

function FriendsList() {
	const { data } = useQuery(QUERY_ME);
	const [me, setMe] = useState(null);
	const [state, dispatch] = useAppContext();
	useEffect(() => {
		if (data && data?.me) {
			setMe(data.me);
			
			dispatch({
				type: UPDATE_FRIENDS,
				friends: data.me.friends
			});
		}
	}, [setMe, data, dispatch]);

	return (
		<>
			{state.friends ? state.friends.map((friend, id) => {
				return <BuddyCard key={id} user={friend} loggedInUser={me} />
			}) : null}
		</>
	);
}

export default FriendsList;
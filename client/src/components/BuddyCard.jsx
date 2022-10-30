import React, { useState, useEffect } from 'react';
import { calculateAge } from '../utils/age';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND, REMOVE_FRIEND } from '../utils/graphql/mutations';
import { UPDATE_FRIENDS } from '../utils/context/actions';
import { useAppContext } from '../utils/context/GlobalState';

function BuddyCard({ user, loggedInUser }) {
	const [pupper, setPupper] = useState(null);
	const [puppersAge, setPuppersAge] = useState(null);
	const [yearMonthText, setYearMonthText] = useState(null);
	const [isFriend, setIsFriend] = useState(false);
	const [addFriend] = useMutation(ADD_FRIEND);
	const [removeFriend] = useMutation(REMOVE_FRIEND);
	const [state, dispatch] = useAppContext();
	
	useEffect(() => {
		if (user && user?.pets && user?.pets.length > 0) {
			const age = calculateAge(user.pets[0].birthday);
			const yearMonth = [];
			
			setPupper(user.pets[0]);
			setPuppersAge(age);
			
			if (age[0] === 1) {
				yearMonth.push("year");
			}
			else {
				yearMonth.push("years");
			}
			
			if (age[1] === 1) {
				yearMonth.push("month");
			}
			else {
				yearMonth.push("months");
			}
			
			setYearMonthText(yearMonth);
		}
	}, [user, setPupper, setPuppersAge, setYearMonthText]);
	
	useEffect(() => {
		// Determines whether the user is a friend of the logged in user
		let found = false;
		
		state.friends?.forEach(friend => {
			if (friend._id === user._id) {
				found = true;
				return;
			}
		});
		
		if (found) setIsFriend(true);
		else setIsFriend(false);
	}, [state.friends, user]);
	
	const addFriendCallback = async (e) => {
		const friendId = user._id;
		
		try {
			// Add the friend to the logged in user
			const user = await addFriend({ variables: { friendId } });
			setIsFriend(true);
			
			dispatch({
				type: UPDATE_FRIENDS,
				friends: user.data.addFriend.friends
			});
		}
		catch (err) {
			console.log(JSON.stringify(err, null, 2));
		}
	};
	
	const removeFriendCallback = async (e) => {
		const friendId = user._id;
		
		try {
			// Remove the friend from the logged in user
			const user = await removeFriend({ variables: { friendId } });
			setIsFriend(false);
			
			dispatch({
				type: UPDATE_FRIENDS,
				friends: user.data.removeFriend.friends
			});
		}
		catch (err) {
			console.log(JSON.stringify(err, null, 2));
		}
	};
	
	// Prevent any errors
	if (user === null || pupper === null || puppersAge === null || yearMonthText === null || loggedInUser === null) {
		return null;
	}
	
	return (
			<div className="col s12 m6 l4 xl3">
				<div className="card buddy-card">
					<div className="card-image">
						<img className="buddy-card__image" src={pupper.imageFilePath} alt={pupper.imageFilePath} />
						<div className="buddy-card__name card-title">{pupper?.name || ''}</div>
						{isFriend ? (<a className="btn-floating halfway-fab waves-effect waves-light red" onClick={(e) => removeFriendCallback(e)}><i className="material-icons">remove</i></a>)
						: (<a className="btn-floating halfway-fab waves-effect waves-light red" onClick={(e) => addFriendCallback(e)}><i className="material-icons">add</i></a>)}
					</div>
					<div className="card-content">
						<div className="buddy-card__breed">
							{pupper.breed}
						</div>
						<div className="buddy-card__age">
							<span className="buddy-card__age-year">{puppersAge[0]} {yearMonthText[0]}</span>
							{puppersAge[1] !== 0 ? <span className="buddy-card__age-month">{puppersAge[1]} {yearMonthText[1]}</span> : null}
						</div>
						<div className="buddy-card__owner">
							<span>Owner: </span>{user.firstName}
						</div>
					</div>
				</div>
			</div>
	);
}

export default BuddyCard;

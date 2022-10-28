import React, { useState, useEffect } from 'react';
import { calculateAge } from '../utils/age';

function BuddyCard({user}) {
	const [pupper, setPupper] = useState(null);
	const [puppersAge, setPuppersAge] = useState(null);
	const [yearMonthText, setYearMonthText] = useState(null);
	
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
	
	// Prevent any errors
	if (user === null || pupper === null || puppersAge === null || yearMonthText === null) {
		return null;
	}
	
	return (
				<div className="card buddy-card">
					<div className="card-content">
						<div className="buddy-card__name center-align">{pupper.name}</div>
						<div className="buddy-card__breed center-align">
							{pupper.breed}
						</div>
						<div className="buddy-card__age center-align">
							<span className="buddy-card__age-year">{puppersAge[0]} {yearMonthText[0]}</span>
							{puppersAge[1] !== 0 ? <span className="buddy-card__age-month">{puppersAge[1]} {yearMonthText[1]}</span> : null}
						</div>
						<div className="buddy-card__owner center-align">
							<span>Owner: </span>{user.firstName}
						</div>
					</div>
				</div>
	);
}

export default BuddyCard;

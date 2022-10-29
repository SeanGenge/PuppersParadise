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
			<div className="row">
				<div className="col s12 m7">
					<div className="card buddy-card">
						<div className="card-image">
							<img className="buddy-card__image" src={pupper.imageFilePath} alt={pupper.imageFilePath} />
							<div className="buddy-card__name card-title">{pupper.name}</div>
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
			</div>
	);
}

export default BuddyCard;

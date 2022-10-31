import React from 'react';

function Rating({ rating }) {
	const renderRating = (rating) => {
		const ratingIcons = [];
		const ratingDeci = rating % 1;
		const ratingWhole = rating - ratingDeci;
		const zeroRating = Math.floor(5 - rating);

		ratingIcons.push(<span key="98" className="infoWindow-star__rating">{rating}</span>)

		// Adds filled stars
		for (let i = 0; i < ratingWhole; i++) {
			ratingIcons.push(<i key={i} className="infoWindow-star fa-solid fa-star"></i>);
		}

		if (ratingDeci !== 0) {
			// There is a decimal portion
			if (ratingDeci < 0.2) {
				ratingIcons.push(<i key="99" className="infoWindow-star fa-regular fa-star"></i>);
			}
			else if (ratingDeci >= 0.2 && ratingDeci <= 0.7) {
				ratingIcons.push(<i key="99" className="infoWindow-star fa-regular fa-star-half-stroke"></i>);
			}
			else {
				ratingIcons.push(<i key="99" className="infoWindow-star fa-solid fa-star"></i>);
			}
		}
		
		// If the rating is less than 4, add empty stars
		for (let i = 0; i < zeroRating; i++) {
			ratingIcons.push(<i key={i + 5} className="infoWindow-star fa-regular fa-star"></i>);
		}

		return ratingIcons;
	};

	return (
		<div className="center-align">
			{renderRating(rating)}
		</div>
	);
}

export default Rating;

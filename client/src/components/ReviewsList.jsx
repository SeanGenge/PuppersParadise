import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/graphql/queries';
import Title from './Title';
import Rating from './Ratings';

function ReviewsList() {
	const { data } = useQuery(QUERY_REVIEWS);
	const [reviews, setReviews] = useState(null);

	useEffect(() => {
		if (data && data?.reviews) {
			// https://bobbyhadz.com/blog/javascript-get-multiple-random-elements-from-array#:~:text=To%20get%20multiple%20random%20elements,to%20get%20multiple%20random%20elements.
			const shuffled = [...data.reviews].sort(() => 0.5 - Math.random());

			const reviews = shuffled.slice(0, 5);
			
			setReviews(reviews);
		}
	}, [data, setReviews]);

	return (
		<>
		<div className="container">
			<div className="row">
				<Title title="Reviews" />
			</div>
			{reviews ? reviews.map((review, id) => {
				return (
					<div key={id} className="review">
						<div className="row">
							<div className="col s12 m8 offset-m2">
								<Rating rating={review.rating} />
							</div>
							<div className="col s12 m8 offset-m2">
								<p className="review-text">
									{review.review}
								</p>
							</div>
						</div>
					</div>
				);
			}) : null}
		</div>
		</>
	);
}

export default ReviewsList;

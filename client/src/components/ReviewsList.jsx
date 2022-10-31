import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS } from '../utils/graphql/queries';
import Title from './Title';
import Rating from './Ratings';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../utils/graphql/mutations';
import Auth from '../utils/auth';
import { useAppContext } from '../utils/context/GlobalState';

function ReviewsList() {
	const { data } = useQuery(QUERY_REVIEWS);
	const [reviews, setReviews] = useState(null);
	const [review, setReview] = useState({});
	const [clickedStarId, setClickedStarId] = useState(0);
	const [state, dispatch] = useAppContext();
	const [createReview] = useMutation(ADD_REVIEW);

	useEffect(() => {
		if (data && data?.reviews) {
			// https://bobbyhadz.com/blog/javascript-get-multiple-random-elements-from-array#:~:text=To%20get%20multiple%20random%20elements,to%20get%20multiple%20random%20elements.
			const shuffled = [...data.reviews].sort(() => 0.5 - Math.random());

			const reviews = shuffled.slice(0, 5);
			
			setReviews(reviews);
		}
	}, [data, setReviews]);
	
	const handleInputChange = (e, updateVar, updateCallback) => {
		const { name, value } = e.target;

		// Update the correct field
		updateCallback({
			...updateVar,
			[name]: value
		});
	};
	
	const handleReview = (e) => {
		e.preventDefault();
		
		const user = Auth.getUser();
		const newReview = {
			...review,
			rating: clickedStarId,
			name: user.data.firstName
		}
		
		createReview({ variables: { review: newReview } });
	};
	
	const renderStarRatingOnClick = () => {
		let renderedStars = [];
		let starsFilled = clickedStarId;
		
		for(let i = 0; i < 5; i++) {
			// Add filled stars up to the id clicked
			if (starsFilled) {
				renderedStars.push(<i key={i} className="infoWindow-star fa-solid fa-star" onClick={() => setClickedStarId(i+1)}></i>);
				starsFilled--;
			}
			else {
				renderedStars.push(<i key={i} className="infoWindow-star fa-regular fa-star" onClick={() => setClickedStarId(i+1)}></i>);
			}
		}
		
		return renderedStars;
	}

	return (
		<>
		<div className="container">
			<div className="row">
				<Title title="Reviews" />
			</div>
			{reviews && reviews?.length ? reviews.map((review, id) => {
				return (
					<div key={id} className="review">
						<div className="row">
							<div className="col s12 m8 offset-m2">
								<Rating rating={review.rating} />
							</div>
							<div className="col s12 m8 offset-m2">
								<p className="review-text">
									{review.review} - {review.name}
								</p>
							</div>
						</div>
					</div>
				);
			}) : <div className="center-align no-reviews">Sorry, there are no reviews</div>}
			
			{/* Add reviews */}
			{state.isLoggedIn ? 
			(<div className="row">
				<form className="col s12">
					<div className="row">
						<div className="col s12 m8 offset-m2 right-align">
							{renderStarRatingOnClick()}
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12 m8 offset-m2">
							<input id="review" name="review" type="text" className="validate" value={review?.review || ''} onChange={(e) => handleInputChange(e, review, setReview)} />
							<label htmlFor="review">Review</label>
						</div>
					</div>
					<div className="row">
						<div className="col s12 m8 offset-m2">
							<button className="btn waves-effect waves-light right background-primary" onClick={(e) => handleReview(e)}>
								Submit
								<i className="material-icons right">send</i>
							</button>
						</div>
					</div>
				</form>
			</div>) : null}
		</div>
		</>
	);
}

export default ReviewsList;

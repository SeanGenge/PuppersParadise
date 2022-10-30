import React, { useState, useEffect } from 'react';

function WhyChooseUs() {
	const [isHorizontal, setIsHorizontal] = useState(true);
	
	useEffect(() => {
		if (window.screen.width <= 500) {
			setIsHorizontal(false);
		}
	});
	
	return (
		<>
			<div className="container">
				<div className="row">
					<h2 className="header center-align">What we do</h2>
				</div>
				<div className="row">
					<div className="col s12 m8 l6 offset-m2">
						<div className="card why-choose-us">
							<div className="card-image">
								<img className="why-choose-us__image" src="/images/home-dogpark.jpg" />
								<span className="card-title text-border">Find a dog buddy</span>
							</div>
							<div className="card-content">
								<p>Meet other dog owners and arrange play dates with your puppers</p>
							</div>
						</div>
					</div>
					<div className="col s12 m8 l6 offset-m2">
						<div className="card why-choose-us">
							<div className="card-image">
								<img className="why-choose-us__image" src="/images/home-map.png" />
								<span className="card-title text-border">Find dog friendly places</span>
							</div>
							<div className="card-content">
								<p>Find dog friendly places near your location where you can meet new people and hang out with your puppers</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default WhyChooseUs;
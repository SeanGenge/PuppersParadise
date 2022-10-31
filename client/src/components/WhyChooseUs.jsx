import React, { useState, useEffect } from 'react';
import Title from './Title';

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
					<Title title="Who we are" />
				</div>
				<div className="row">
					<div className="col s12 m8 l6 offset-m2">
						<div className="card why-choose-us">
							<div className="card-image">
								<img className="why-choose-us__image" src="/images/home-dogpark.jpg" />
								<span className="card-title text-border">Find a dog buddy</span>
							</div>
							<div className="card-content">
								<ul>
									<li>
										Meet other dog owners and arrange play dates for your puppers
									</li>
									<li>
										Connect with dog-owners around you, who would be glad to meet up with your pup
									</li>
								</ul>
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
								<ul>
									<ul>
										Find dog friendly places near your location where you can meet new people and puppers
									</ul>
									<li>
										Keeps you up to date with dog friendly places in your neighbourhood for social events and leisure
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default WhyChooseUs;
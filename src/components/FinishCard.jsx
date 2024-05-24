import React from "react";
import "./FinishCard.css";

function FinishCard({ onRestartClick, totalScore, attemptedScore, obtainedScore, incorrectGuesses }) {
	const handleRestartClick = () => {
		onRestartClick(); // Call the callback function passed from App.jsx to restart the game
	};

	return (
		<div className="card outer-card">
			<div className="inner-card">
				<h2 className="card-title">Score Card</h2>
				<div className="score-details">
					<div className="table-container">
						<table className="table">
							<tr>
								<th>Total Score</th>
								<td>{totalScore}</td>
							</tr>
							<tr>
								<th>Attempted Questions</th>
								<td>{attemptedScore}</td>
							</tr>
							<tr>
								<th>Correct Guesses</th>
								<td>{obtainedScore}</td>
							</tr>
							<tr>
								<th>Incorrect Guesses</th>
								<td>{incorrectGuesses}</td>
							</tr>
						</table>
					</div>
				</div>
				<button
					className="play-again-btn"
					onClick={handleRestartClick}>
					Play Again
				</button>
			</div>
		</div>
	);
}

export default FinishCard;

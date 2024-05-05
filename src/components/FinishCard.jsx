import React from 'react';
import './FinishCard.css';

function FinishCard({ onRestartClick, totalScore, correctGuesses }) {
    const handleRestartClick = () => {
        onRestartClick(); // Call the callback function passed from App.jsx to restart the game
    };

    return (
        <div className="card outer-card">
            <div className="inner-card">
                <h2 className="card-title">Score Card</h2>
                <div className="score-details">
                    <p>
                        Total Score: <span>{totalScore}</span>
                    </p>
                    <p>
                        Obtained Score: <span>{correctGuesses}</span>
                    </p>
                    {/* Additional score details if needed */}
                </div>
                <button className="play-again-btn" onClick={handleRestartClick}>
                    Play Again
                </button>
            </div>
        </div>
    );
}

export default FinishCard;

import React, { useState } from 'react';
import './App.css';
import GuessCard from './components/GuessCard.jsx';
import InitialFlagContainer from './components/InitialFlagContainer.jsx';
import FinishCard from './components/FinishCard.jsx';

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [correctGuesses, setCorrectGuesses] = useState(0);
    const [selectedContinent, setSelectedContinent] = useState('');

    const handleStartClick = (continent) => {
        setGameStarted(true);
        setSelectedContinent(continent);
    };

    const handleGameFinish = (score, correctGuesses) => {
        setIsGameFinished(true);
        setTotalScore(score);
        setCorrectGuesses(correctGuesses);
    };

    const handleRestartClick = () => {
        setGameStarted(false);
        setIsGameFinished(false);
        setTotalScore(0);
        setCorrectGuesses(0);
    };

    return (
        <div>
            {!gameStarted && <InitialFlagContainer onStartClick={handleStartClick} />}
            {gameStarted && !isGameFinished && (
                <GuessCard onGameFinish={handleGameFinish} selectedContinent={selectedContinent} />
            )}
            {isGameFinished && (
                <FinishCard totalScore={totalScore} correctGuesses={correctGuesses} onRestartClick={handleRestartClick} />
            )}
        </div>
    );
}

export default App;

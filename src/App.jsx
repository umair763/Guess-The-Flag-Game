import React, { useState } from "react";
import "./App.css";
import GuessCard from "./components/GuessCard.jsx";
import InitialFlagContainer from "./components/InitialFlagContainer.jsx";
import FinishCard from "./components/FinishCard.jsx";

const flags = {
	Africa: [
		"Nigeria",
		"Ethiopia",
		"Egypt",
		"Democratic Republic of the Congo",
		"Tanzania",
		"Kenya",
		"South Africa",
		"Uganda",
		"Algeria",
		"Sudan",
		"Morocco",
		"Angola",
		"Ghana",
		"Mozambique",
		"Madagascar",
		"Cameroon",
		"Côte d'Ivoire",
		"Niger",
		"Burkina Faso",
		"Mali",
	],
	Asia: [
		"China",
		"India",
		"Indonesia",
		"Pakistan",
		"Bangladesh",
		"Japan",
		"Philippines",
		"Vietnam",
		"Turkey",
		"Iran",
		"Thailand",
		"Myanmar (Burma)",
		"South Korea",
		"Iraq",
		"Afghanistan",
		"Saudi Arabia",
		"Uzbekistan",
		"Malaysia",
		"Yemen",
		"Nepal",
	],
	Europe: [
		"Russia",
		"Germany",
		"United Kingdom",
		"France",
		"Italy",
		"Spain",
		"Ukraine",
		"Poland",
		"Romania",
		"Netherlands",
		"Belgium",
		"Greece",
		"Czech Republic",
		"Portugal",
		"Sweden",
		"Hungary",
		"Belarus",
		"Austria",
		"Switzerland",
		"Bulgaria",
	],
	NorthAmerica: [
		"United States",
		"Mexico",
		"Canada",
		"Guatemala",
		"Cuba",
		"Haiti",
		"Dominican Republic",
		"Honduras",
		"El Salvador",
		"Nicaragua",
		"Costa Rica",
		"Panama",
		"Jamaica",
		"Trinidad and Tobago",
		"Bahamas",
		"Belize",
		"Barbados",
		"Saint Lucia",
		"Grenada",
		"Saint Vincent and the Grenadines",
	],
	SouthAmerica: [
		"Brazil",
		"Colombia",
		"Argentina",
		"Peru",
		"Venezuela",
		"Chile",
		"Ecuador",
		"Bolivia",
		"Paraguay",
		"Uruguay",
		"Guyana",
		"Suriname",
		"French Guiana",
		"Falkland Islands",
		"South Georgia and the South Sandwich Islands",
	],
	Australia: [
		"Papua New Guinea",
		"New Zealand",
		"Fiji",
		"Solomon Islands",
		"Vanuatu",
		"Samoa",
		"Kiribati",
		"Tonga",
		"Micronesia",
		"Marshall Islands",
		"Palau",
		"Tuvalu",
		"Nauru",
		"Cook Islands",
		"Niue",
		"American Samoa",
		"Wallis and Futuna",
		"Norfolk Island",
		"Pitcairn Islands",
	],
};

function App() {
	const [gameStarted, setGameStarted] = useState(false);
	const [isGameFinished, setIsGameFinished] = useState(false);
	const [totalScore, setTotalScore] = useState(0);
	const [attemptedScore, setAttemptedScore] = useState(0);
	const [correctGuesses, setCorrectGuesses] = useState(0);
	const [incorrectGuesses, setIncorrectGuesses] = useState(0);
	const [selectedContinent, setSelectedContinent] = useState("");

	const handleStartClick = (continent) => {
		setGameStarted(true);
		setSelectedContinent(continent);
	};

	const continentMapping = {
		Africa: "Africa",
		Asia: "Asia",
		Europe: "Europe",
		"North America": "NorthAmerica",
		"South America": "SouthAmerica",
		Australia: "Australia",
	};

	const handleGameFinish = (totalScore, attemptedScore, correctGuesses, incorrectGuesses) => {
		// Use the mapping object to translate the plural continent name to camelCase
		const continentKey = continentMapping[selectedContinent];

		// Check if the translated key exists in the flags object
		if (flags[continentKey]) {
			// Calculate the totalScore based on the length of the array
			const totalScore = flags[continentKey].length;

			// Set the game as finished and update the scores
			setIsGameFinished(true);
			setTotalScore(totalScore);
			setAttemptedScore(attemptedScore); // Reflect the current attempt count
			setCorrectGuesses(correctGuesses); // Keep the current correct guesses count
			setIncorrectGuesses(incorrectGuesses); // Keep the current incorrect guesses count
		} else {
			console.error(`No countries found for ${selectedContinent}`);
		}
	};

	const handleRestartClick = () => {
		setGameStarted(false);
		setIsGameFinished(false);
		setTotalScore(0);
		setAttemptedScore(0);
		setCorrectGuesses(0);
		setIncorrectGuesses(0);
	};

	const handleQuitGame = (totalScore, attemptedScore, correctGuesses, incorrectGuesses) => {
		// Use the mapping object to translate the plural continent name to camelCase
		const continentKey = continentMapping[selectedContinent];

		// Check if the translated key exists in the flags object
		if (flags[continentKey]) {
			// Calculate the totalScore based on the length of the array
			const totalScore = flags[continentKey].length;

			// Set the game as finished and update the scores
			setIsGameFinished(true);
			setTotalScore(totalScore);
			setAttemptedScore(attemptedScore); // Reflect the current attempt count
			setCorrectGuesses(correctGuesses); // Keep the current correct guesses count
			setIncorrectGuesses(incorrectGuesses); // Keep the current incorrect guesses count
		} else {
			console.error(`No countries found for ${selectedContinent}`);
		}
	};

	return (
		<div>
			{!gameStarted && <InitialFlagContainer onStartClick={handleStartClick} />}
			{gameStarted && !isGameFinished && (
				<GuessCard
					onGameFinish={handleGameFinish}
					onQuitGame={handleQuitGame} // Pass the onQuitGame function as a prop
					selectedContinent={selectedContinent}
				/>
			)}
			{isGameFinished && (
				<FinishCard
					totalScore={totalScore}
					attemptedScore={attemptedScore}
					obtainedScore={correctGuesses} // Pass correctGuesses as obtainedScore
					incorrectGuesses={incorrectGuesses}
					onRestartClick={handleRestartClick}
				/>
			)}
		</div>
	);
}

export default App;

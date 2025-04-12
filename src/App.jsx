"use client";

import { useState, lazy, Suspense } from "react";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";

// Lazy load components for better performance
const InitialFlagContainer = lazy(() => import("./components/InitialFlagContainer"));
const GuessCard = lazy(() => import("./components/GuessCard"));
const FinishCard = lazy(() => import("./components/FinishCard"));

// Flag data organized by continent
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
	const [gameStats, setGameStats] = useState({
		totalScore: 0,
		attemptedScore: 0,
		correctGuesses: 0,
		incorrectGuesses: 0,
		skippedFlags: 0,
	});
	const [selectedContinent, setSelectedContinent] = useState("");
	const [flagCount, setFlagCount] = useState(10); // Default to 10 flags

	const handleStartClick = (continent, count) => {
		setGameStarted(true);
		setSelectedContinent(continent);
		setFlagCount(count);
	};

	const continentMapping = {
		Africa: "Africa",
		Asia: "Asia",
		Europe: "Europe",
		"North America": "NorthAmerica",
		"South America": "SouthAmerica",
		Australia: "Australia",
	};

	const handleGameFinish = (stats) => {
		// Use the mapping object to translate the plural continent name to camelCase
		const continentKey = continentMapping[selectedContinent];

		// Check if the translated key exists in the flags object
		if (flags[continentKey]) {
			setIsGameFinished(true);
			// Make sure the stats are correctly set
			setGameStats({
				...stats,
				// Ensure attempted score is at least equal to correct + incorrect
				attemptedScore: Math.max(stats.attemptedScore, stats.correctGuesses + stats.incorrectGuesses),
			});
		} else {
			console.error(`No countries found for ${selectedContinent}`);
		}
	};

	const handleRestartClick = () => {
		setGameStarted(false);
		setIsGameFinished(false);
		setGameStats({
			totalScore: 0,
			attemptedScore: 0,
			correctGuesses: 0,
			incorrectGuesses: 0,
			skippedFlags: 0,
		});
	};

	return (
		<div className="app-container">
			<Suspense fallback={<LoadingScreen />}>
				<AnimatePresence mode="wait">
					{!gameStarted && (
						<motion.div
							key="initial"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}>
							<InitialFlagContainer onStartClick={handleStartClick} />
						</motion.div>
					)}

					{gameStarted && !isGameFinished && (
						<motion.div
							key="game"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -50 }}
							transition={{ duration: 0.5 }}>
							<GuessCard
								onGameFinish={handleGameFinish}
								selectedContinent={selectedContinent}
								flagCount={flagCount}
							/>
						</motion.div>
					)}

					{isGameFinished && (
						<motion.div
							key="finish"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.5 }}>
							<FinishCard
								gameStats={gameStats}
								onRestartClick={handleRestartClick}
								selectedContinent={selectedContinent}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</Suspense>
		</div>
	);
}

export default App;

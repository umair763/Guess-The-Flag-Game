"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./GuessCard.css";

// Import all flag images statically
// This approach works better with Vite/webpack
import ngImage from "../components/flag-images/country-flags-main/png1000px/ng.png"; // Nigeria
import etImage from "../components/flag-images/country-flags-main/png1000px/et.png"; // Ethiopia
import egImage from "../components/flag-images/country-flags-main/png1000px/eg.png"; // Egypt
import cdImage from "../components/flag-images/country-flags-main/png1000px/cd.png"; // Democratic Republic of the Congo
import tzImage from "../components/flag-images/country-flags-main/png1000px/tz.png"; // Tanzania
import keImage from "../components/flag-images/country-flags-main/png1000px/ke.png"; // Kenya
import zaImage from "../components/flag-images/country-flags-main/png1000px/za.png"; // South Africa
import ugImage from "../components/flag-images/country-flags-main/png1000px/ug.png"; // Uganda
import dzImage from "../components/flag-images/country-flags-main/png1000px/dz.png"; // Algeria
import sdImage from "../components/flag-images/country-flags-main/png1000px/sd.png"; // Sudan
import maImage from "../components/flag-images/country-flags-main/png1000px/ma.png"; // Morocco
import aoImage from "../components/flag-images/country-flags-main/png1000px/ao.png"; // Angola
import ghImage from "../components/flag-images/country-flags-main/png1000px/gh.png"; // Ghana
import mzImage from "../components/flag-images/country-flags-main/png1000px/mz.png"; // Mozambique
import mgImage from "../components/flag-images/country-flags-main/png1000px/mg.png"; // Madagascar
import cmImage from "../components/flag-images/country-flags-main/png1000px/cm.png"; // Cameroon
import ciImage from "../components/flag-images/country-flags-main/png1000px/ci.png"; // Côte d'Ivoire
import neImage from "../components/flag-images/country-flags-main/png1000px/ne.png"; // Niger
import bfImage from "../components/flag-images/country-flags-main/png1000px/bf.png"; // Burkina Faso
import mlImage from "../components/flag-images/country-flags-main/png1000px/ml.png"; // Mali

// Asia
import cnImage from "../components/flag-images/country-flags-main/png1000px/cn.png"; // China
import inImage from "../components/flag-images/country-flags-main/png1000px/in.png"; // India
import idImage from "../components/flag-images/country-flags-main/png1000px/id.png"; // Indonesia
import pkImage from "../components/flag-images/country-flags-main/png1000px/pk.png"; // Pakistan
import bdImage from "../components/flag-images/country-flags-main/png1000px/bd.png"; // Bangladesh
import jpImage from "../components/flag-images/country-flags-main/png1000px/jp.png"; // Japan
import phImage from "../components/flag-images/country-flags-main/png1000px/ph.png"; // Philippines
import vnImage from "../components/flag-images/country-flags-main/png1000px/vn.png"; // Vietnam
import trImage from "../components/flag-images/country-flags-main/png1000px/tr.png"; // Turkey
import irImage from "../components/flag-images/country-flags-main/png1000px/ir.png"; // Iran
import thImage from "../components/flag-images/country-flags-main/png1000px/th.png"; // Thailand
import mmImage from "../components/flag-images/country-flags-main/png1000px/mm.png"; // Myanmar (Burma)
import krImage from "../components/flag-images/country-flags-main/png1000px/kr.png"; // South Korea
import iqImage from "../components/flag-images/country-flags-main/png1000px/iq.png"; // Iraq
import afImage from "../components/flag-images/country-flags-main/png1000px/af.png"; // Afghanistan
import saImage from "../components/flag-images/country-flags-main/png1000px/sa.png"; // Saudi Arabia
import uzImage from "../components/flag-images/country-flags-main/png1000px/uz.png"; // Uzbekistan
import myImage from "../components/flag-images/country-flags-main/png1000px/my.png"; // Malaysia
import yeImage from "../components/flag-images/country-flags-main/png1000px/ye.png"; // Yemen
import npImage from "../components/flag-images/country-flags-main/png1000px/np.png"; // Nepal

// Europe
import ruImage from "../components/flag-images/country-flags-main/png1000px/ru.png"; // Russia
import deImage from "../components/flag-images/country-flags-main/png1000px/de.png"; // Germany
import gbImage from "../components/flag-images/country-flags-main/png1000px/gb.png"; // United Kingdom
import frImage from "../components/flag-images/country-flags-main/png1000px/fr.png"; // France
import itImage from "../components/flag-images/country-flags-main/png1000px/it.png"; // Italy
import esImage from "../components/flag-images/country-flags-main/png1000px/es.png"; // Spain
import uaImage from "../components/flag-images/country-flags-main/png1000px/ua.png"; // Ukraine
import plImage from "../components/flag-images/country-flags-main/png1000px/pl.png"; // Poland
import roImage from "../components/flag-images/country-flags-main/png1000px/ro.png"; // Romania
import nlImage from "../components/flag-images/country-flags-main/png1000px/nl.png"; // Netherlands
import beImage from "../components/flag-images/country-flags-main/png1000px/be.png"; // Belgium
import grImage from "../components/flag-images/country-flags-main/png1000px/gr.png"; // Greece
import czImage from "../components/flag-images/country-flags-main/png1000px/cz.png"; // Czech Republic
import ptImage from "../components/flag-images/country-flags-main/png1000px/pt.png"; // Portugal
import seImage from "../components/flag-images/country-flags-main/png1000px/se.png"; // Sweden
import huImage from "../components/flag-images/country-flags-main/png1000px/hu.png"; // Hungary
import byImage from "../components/flag-images/country-flags-main/png1000px/by.png"; // Belarus
import atImage from "../components/flag-images/country-flags-main/png1000px/at.png"; // Austria
import chImage from "../components/flag-images/country-flags-main/png1000px/ch.png"; // Switzerland
import bgImage from "../components/flag-images/country-flags-main/png1000px/bg.png"; // Bulgaria

// North America
import usImage from "../components/flag-images/country-flags-main/png1000px/us.png"; // United States
import mxImage from "../components/flag-images/country-flags-main/png1000px/mx.png"; // Mexico
import caImage from "../components/flag-images/country-flags-main/png1000px/ca.png"; // Canada
import gtImage from "../components/flag-images/country-flags-main/png1000px/gt.png"; // Guatemala
import cuImage from "../components/flag-images/country-flags-main/png1000px/cu.png"; // Cuba
import htImage from "../components/flag-images/country-flags-main/png1000px/ht.png"; // Haiti
import doImage from "../components/flag-images/country-flags-main/png1000px/do.png"; // Dominican Republic
import hnImage from "../components/flag-images/country-flags-main/png1000px/hn.png"; // Honduras
import svImage from "../components/flag-images/country-flags-main/png1000px/sv.png"; // El Salvador
import niImage from "../components/flag-images/country-flags-main/png1000px/ni.png"; // Nicaragua
import crImage from "../components/flag-images/country-flags-main/png1000px/cr.png"; // Costa Rica
import paImage from "../components/flag-images/country-flags-main/png1000px/pa.png"; // Panama
import jmImage from "../components/flag-images/country-flags-main/png1000px/jm.png"; // Jamaica
import ttImage from "../components/flag-images/country-flags-main/png1000px/tt.png"; // Trinidad and Tobago
import bsImage from "../components/flag-images/country-flags-main/png1000px/bs.png"; // Bahamas
import bzImage from "../components/flag-images/country-flags-main/png1000px/bz.png"; // Belize
import bbImage from "../components/flag-images/country-flags-main/png1000px/bb.png"; // Barbados
import lcImage from "../components/flag-images/country-flags-main/png1000px/lc.png"; // Saint Lucia
import gdImage from "../components/flag-images/country-flags-main/png1000px/gd.png"; // Grenada
import vcImage from "../components/flag-images/country-flags-main/png1000px/vc.png"; // Saint Vincent and the Grenadines

// South America
import brImage from "../components/flag-images/country-flags-main/png1000px/br.png"; // Brazil
import coImage from "../components/flag-images/country-flags-main/png1000px/co.png"; // Colombia
import arImage from "../components/flag-images/country-flags-main/png1000px/ar.png"; // Argentina
import peImage from "../components/flag-images/country-flags-main/png1000px/pe.png"; // Peru
import veImage from "../components/flag-images/country-flags-main/png1000px/ve.png"; // Venezuela
import clImage from "../components/flag-images/country-flags-main/png1000px/cl.png"; // Chile
import ecImage from "../components/flag-images/country-flags-main/png1000px/ec.png"; // Ecuador
import boImage from "../components/flag-images/country-flags-main/png1000px/bo.png"; // Bolivia
import pyImage from "../components/flag-images/country-flags-main/png1000px/py.png"; // Paraguay
import uyImage from "../components/flag-images/country-flags-main/png1000px/uy.png"; // Uruguay
import gyImage from "../components/flag-images/country-flags-main/png1000px/gy.png"; // Guyana
import srImage from "../components/flag-images/country-flags-main/png1000px/sr.png"; // Suriname
import gfImage from "../components/flag-images/country-flags-main/png1000px/gf.png"; // French Guiana
import fkImage from "../components/flag-images/country-flags-main/png1000px/fk.png"; // Falkland Islands
import gsImage from "../components/flag-images/country-flags-main/png1000px/gs.png"; // South Georgia and the South Sandwich Islands

// Australia/Oceania
import pgImage from "../components/flag-images/country-flags-main/png1000px/pg.png"; // Papua New Guinea
import nzImage from "../components/flag-images/country-flags-main/png1000px/nz.png"; // New Zealand
import fjImage from "../components/flag-images/country-flags-main/png1000px/fj.png"; // Fiji
import sbImage from "../components/flag-images/country-flags-main/png1000px/sb.png"; // Solomon Islands
import vuImage from "../components/flag-images/country-flags-main/png1000px/vu.png"; // Vanuatu
import wsImage from "../components/flag-images/country-flags-main/png1000px/ws.png"; // Samoa
import kiImage from "../components/flag-images/country-flags-main/png1000px/ki.png"; // Kiribati
import toImage from "../components/flag-images/country-flags-main/png1000px/to.png"; // Tonga
import fmImage from "../components/flag-images/country-flags-main/png1000px/fm.png"; // Micronesia
import mhImage from "../components/flag-images/country-flags-main/png1000px/mh.png"; // Marshall Islands
import pwImage from "../components/flag-images/country-flags-main/png1000px/pw.png"; // Palau
import tvImage from "../components/flag-images/country-flags-main/png1000px/tv.png"; // Tuvalu
import nrImage from "../components/flag-images/country-flags-main/png1000px/nr.png"; // Nauru
import ckImage from "../components/flag-images/country-flags-main/png1000px/ck.png"; // Cook Islands
import nuImage from "../components/flag-images/country-flags-main/png1000px/nu.png"; // Niue
import asImage from "../components/flag-images/country-flags-main/png1000px/as.png"; // American Samoa
import wfImage from "../components/flag-images/country-flags-main/png1000px/wf.png"; // Wallis and Futuna
import nfImage from "../components/flag-images/country-flags-main/png1000px/nf.png"; // Norfolk Island
import pnImage from "../components/flag-images/country-flags-main/png1000px/pn.png"; // Pitcairn Islands

// Create a map of country names to flag images
const flagImageMap = {
	// Africa
	Nigeria: ngImage,
	Ethiopia: etImage,
	Egypt: egImage,
	"Democratic Republic of the Congo": cdImage,
	Tanzania: tzImage,
	Kenya: keImage,
	"South Africa": zaImage,
	Uganda: ugImage,
	Algeria: dzImage,
	Sudan: sdImage,
	Morocco: maImage,
	Angola: aoImage,
	Ghana: ghImage,
	Mozambique: mzImage,
	Madagascar: mgImage,
	Cameroon: cmImage,
	"Côte d'Ivoire": ciImage,
	Niger: neImage,
	"Burkina Faso": bfImage,
	Mali: mlImage,

	// Asia
	China: cnImage,
	India: inImage,
	Indonesia: idImage,
	Pakistan: pkImage,
	Bangladesh: bdImage,
	Japan: jpImage,
	Philippines: phImage,
	Vietnam: vnImage,
	Turkey: trImage,
	Iran: irImage,
	Thailand: thImage,
	"Myanmar (Burma)": mmImage,
	"South Korea": krImage,
	Iraq: iqImage,
	Afghanistan: afImage,
	"Saudi Arabia": saImage,
	Uzbekistan: uzImage,
	Malaysia: myImage,
	Yemen: yeImage,
	Nepal: npImage,

	// Europe
	Russia: ruImage,
	Germany: deImage,
	"United Kingdom": gbImage,
	France: frImage,
	Italy: itImage,
	Spain: esImage,
	Ukraine: uaImage,
	Poland: plImage,
	Romania: roImage,
	Netherlands: nlImage,
	Belgium: beImage,
	Greece: grImage,
	"Czech Republic": czImage,
	Portugal: ptImage,
	Sweden: seImage,
	Hungary: huImage,
	Belarus: byImage,
	Austria: atImage,
	Switzerland: chImage,
	Bulgaria: bgImage,

	// North America
	"United States": usImage,
	Mexico: mxImage,
	Canada: caImage,
	Guatemala: gtImage,
	Cuba: cuImage,
	Haiti: htImage,
	"Dominican Republic": doImage,
	Honduras: hnImage,
	"El Salvador": svImage,
	Nicaragua: niImage,
	"Costa Rica": crImage,
	Panama: paImage,
	Jamaica: jmImage,
	"Trinidad and Tobago": ttImage,
	Bahamas: bsImage,
	Belize: bzImage,
	Barbados: bbImage,
	"Saint Lucia": lcImage,
	Grenada: gdImage,
	"Saint Vincent and the Grenadines": vcImage,

	// South America
	Brazil: brImage,
	Colombia: coImage,
	Argentina: arImage,
	Peru: peImage,
	Venezuela: veImage,
	Chile: clImage,
	Ecuador: ecImage,
	Bolivia: boImage,
	Paraguay: pyImage,
	Uruguay: uyImage,
	Guyana: gyImage,
	Suriname: srImage,
	"French Guiana": gfImage,
	"Falkland Islands": fkImage,
	"South Georgia and the South Sandwich Islands": gsImage,

	// Australia/Oceania
	"Papua New Guinea": pgImage,
	"New Zealand": nzImage,
	Fiji: fjImage,
	"Solomon Islands": sbImage,
	Vanuatu: vuImage,
	Samoa: wsImage,
	Kiribati: kiImage,
	Tonga: toImage,
	Micronesia: fmImage,
	"Marshall Islands": mhImage,
	Palau: pwImage,
	Tuvalu: tvImage,
	Nauru: nrImage,
	"Cook Islands": ckImage,
	Niue: nuImage,
	"American Samoa": asImage,
	"Wallis and Futuna": wfImage,
	"Norfolk Island": nfImage,
	"Pitcairn Islands": pnImage,
};

// Continent data
const continentData = {
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
	"North America": [
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
	"South America": [
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

function GuessCard({ onGameFinish, selectedContinent, flagCount }) {
	const [gameFlags, setGameFlags] = useState([]);
	const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
	const [options, setOptions] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null);
	const [isCorrect, setIsCorrect] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [gameStats, setGameStats] = useState({
		totalScore: 0,
		attemptedScore: 0,
		correctGuesses: 0,
		incorrectGuesses: 0,
		skippedFlags: 0,
	});
	const [showFeedback, setShowFeedback] = useState(false);
	const [progress, setProgress] = useState(0);

	// Shuffle function
	const shuffle = (array) => {
		const newArray = [...array];
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	};

	// Initialize game with flags from selected continent
	useEffect(() => {
		const initializeGame = () => {
			setIsLoading(true);

			// Get countries for the selected continent
			const countries = continentData[selectedContinent] || [];

			// Shuffle and limit to requested count
			const shuffledCountries = shuffle(countries).slice(0, flagCount);

			// Set game flags
			setGameFlags(shuffledCountries);
			setGameStats((prev) => ({
				...prev,
				totalScore: shuffledCountries.length,
			}));

			setIsLoading(false);
		};

		initializeGame();
	}, [selectedContinent, flagCount]);

	// Set options for current flag
	useEffect(() => {
		if (gameFlags.length > 0 && currentFlagIndex < gameFlags.length) {
			const correctCountry = gameFlags[currentFlagIndex];

			// Get all countries from the same continent except the correct one
			const otherCountries = continentData[selectedContinent].filter((country) => country !== correctCountry);

			// Select 3 random incorrect options
			const incorrectOptions = shuffle(otherCountries).slice(0, 3);

			// Combine and shuffle all options
			const allOptions = shuffle([...incorrectOptions, correctCountry]);

			setOptions(allOptions);
			setSelectedOption(null);
			setIsCorrect(null);
			setShowFeedback(false);

			// Update progress
			setProgress((currentFlagIndex / gameFlags.length) * 100);
		}
	}, [gameFlags, currentFlagIndex, selectedContinent]);

	const handleOptionClick = (option) => {
		if (selectedOption !== null || isLoading) return;

		const correctCountry = gameFlags[currentFlagIndex];
		const correct = option === correctCountry;

		setSelectedOption(option);
		setIsCorrect(correct);
		setShowFeedback(true);

		// Update game stats
		setGameStats((prev) => ({
			...prev,
			attemptedScore: prev.attemptedScore + 1,
			correctGuesses: correct ? prev.correctGuesses + 1 : prev.correctGuesses,
			incorrectGuesses: !correct ? prev.incorrectGuesses + 1 : prev.incorrectGuesses,
		}));

		// Auto-advance after a delay
		setTimeout(() => {
			handleNextFlag();
		}, 1500);
	};

	const handleSkipFlag = () => {
		if (selectedOption !== null || isLoading) return;

		setGameStats((prev) => ({
			...prev,
			skippedFlags: prev.skippedFlags + 1,
		}));

		handleNextFlag();
	};

	const handleNextFlag = () => {
		if (currentFlagIndex < gameFlags.length - 1) {
			setCurrentFlagIndex((prevIndex) => prevIndex + 1);
		} else {
			// Game finished - ensure we're using the correct stats
			const finalStats = {
				...gameStats,
				totalScore: gameFlags.length, // Use the actual number of flags in the game
				// If the last flag was answered (not skipped), we need to ensure it's counted in attemptedScore
				attemptedScore: selectedOption !== null ? gameStats.attemptedScore : gameStats.attemptedScore,
			};
			onGameFinish(finalStats);
		}
	};

	// Get the current flag image
	const getCurrentFlagImage = () => {
		if (gameFlags.length === 0 || currentFlagIndex >= gameFlags.length) {
			return "/placeholder.svg";
		}

		const country = gameFlags[currentFlagIndex];
		return flagImageMap[country] || "/placeholder.svg";
	};

	return (
		<div className="guess-card-container">
			<div className="progress-bar-container">
				<div
					className="progress-bar"
					style={{ width: `${progress}%` }}
				/>
			</div>

			<div className="game-stats-header">
				<div className="stat-item">
					<span className="stat-label">Correct:</span>
					<span className="stat-value correct">{gameStats.correctGuesses}</span>
				</div>
				<div className="stat-item">
					<span className="stat-label">Incorrect:</span>
					<span className="stat-value incorrect">{gameStats.incorrectGuesses}</span>
				</div>
				<div className="stat-item">
					<span className="stat-label">Skipped:</span>
					<span className="stat-value skipped">{gameStats.skippedFlags}</span>
				</div>
			</div>

			{isLoading ? (
				<div className="loading-indicator">
					<div className="spinner"></div>
					<p>Loading flags...</p>
				</div>
			) : (
				<>
					<motion.div
						className="flag-container"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						key={currentFlagIndex}
						transition={{ duration: 0.3 }}>
						<h2 className="flag-title">Which country does this flag belong to?</h2>
						<div className="flag-image-container">
							<img
								src={getCurrentFlagImage() || "/placeholder.svg"}
								alt="Flag to guess"
								className="flag-image"
								onError={(e) => {
									console.error(`Failed to load image for ${gameFlags[currentFlagIndex]}`);
									e.target.src = "/placeholder.svg";
								}}
							/>
						</div>
					</motion.div>

					<div className="options-container">
						<AnimatePresence mode="wait">
							{options.map((option, index) => (
								<motion.button
									key={option}
									className={`option-button ${
										selectedOption === option
											? isCorrect
												? "correct"
												: "incorrect"
											: selectedOption && option === gameFlags[currentFlagIndex]
											? "correct"
											: ""
									}`}
									onClick={() => handleOptionClick(option)}
									disabled={selectedOption !== null}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3, delay: index * 0.1 }}
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.97 }}>
									{option}
								</motion.button>
							))}
						</AnimatePresence>
					</div>

					{showFeedback && (
						<motion.div
							className={`feedback-message ${isCorrect ? "correct" : "incorrect"}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}>
							{isCorrect ? "✓ Correct!" : `✗ Incorrect! The correct answer is ${gameFlags[currentFlagIndex]}`}
						</motion.div>
					)}

					<div className="action-buttons">
						<motion.button
							className="skip-button"
							onClick={handleSkipFlag}
							disabled={selectedOption !== null}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							Skip
						</motion.button>

						<motion.button
							className="next-button"
							onClick={handleNextFlag}
							disabled={selectedOption === null && currentFlagIndex < gameFlags.length - 1}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							{currentFlagIndex < gameFlags.length - 1 ? "Next" : "Finish"}
						</motion.button>
					</div>
				</>
			)}
		</div>
	);
}

export default GuessCard;

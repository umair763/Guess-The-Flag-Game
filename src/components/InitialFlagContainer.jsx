"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import "./InitialFlagContainer.css";

function InitialFlagContainer({ onStartClick }) {
	const [selectedContinent, setSelectedContinent] = useState("");
	const [flagCount, setFlagCount] = useState(10);
	const [isHovered, setIsHovered] = useState(false);

	const handleStartClick = () => {
		if (selectedContinent) {
			onStartClick(selectedContinent, flagCount);
		} else {
			alert("Please select a continent to start guessing flags!");
		}
	};

	const continents = ["Africa", "Asia", "Europe", "North America", "South America", "Australia"];

    return (
        <div className="initial-container">
            <motion.div
                className="world-map-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.5 }}>
                <img
                    src="./src/components/World countries flags stock illustration.jpeg"
                    alt="World Map"
                    className="world-map"
                    style={{ opacity: 0.8 }}
                />
            </motion.div>

            <motion.div
                className="selection-card"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 0.9 }}
                transition={{ delay: 0.2, duration: 0.5 }}>
                <motion.h1
                    className="game-title"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.9 }}
                    transition={{ delay: 0.4, duration: 0.5 }}>
                    Guess The Flag
                </motion.h1>

                <div className="selection-section">
                    <h2 className="selection-title">Select a Continent</h2>
                    <div className="continent-options">
                        {continents.map((continent) => (
                            <motion.button
                                key={continent}
                                className={`continent-option ${selectedContinent === continent ? "selected" : ""}`}
                                onClick={() => setSelectedContinent(continent)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}>
                                {continent}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="selection-section">
                    <h2 className="selection-title">How many flags to guess?</h2>
                    <div className="flag-count-slider">
                        <input
                            type="range"
                            min="5"
                            max="20"
                            value={flagCount}
                            onChange={(e) => setFlagCount(Number.parseInt(e.target.value))}
                            className="slider"
                        />
                        <span className="flag-count">{flagCount} flags</span>
                    </div>
                </div>

                <motion.button
                    className="start-button"
                    onClick={handleStartClick}
                    disabled={!selectedContinent}
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "var(--secondary-color)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}>
                    Start Game
                    <motion.span
                        className="button-arrow"
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.2 }}>
                        →
                    </motion.span>
                </motion.button>
            </motion.div>
        </div>
    );
}

export default InitialFlagContainer;

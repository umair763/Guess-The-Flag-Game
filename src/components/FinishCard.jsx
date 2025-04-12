"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import "./FinishCard.css";

function FinishCard({ gameStats, onRestartClick, selectedContinent }) {
	const [showConfetti, setShowConfetti] = useState(true);

	// Trigger confetti effect on component mount
	if (showConfetti) {
		const duration = 3 * 1000;
		const animationEnd = Date.now() + duration;
		const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

		const randomInRange = (min, max) => Math.random() * (max - min) + min;

		const interval = setInterval(() => {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				setShowConfetti(false);
				return clearInterval(interval);
			}

			const particleCount = 50 * (timeLeft / duration);

			// Since particles fall down, start a bit higher than random
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
			});
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
			});
		}, 250);
	}

	// Calculate score percentage
	const scorePercentage =
		gameStats.attemptedScore > 0 ? Math.round((gameStats.correctGuesses / gameStats.attemptedScore) * 100) : 0;

	// Determine performance message
	const getPerformanceMessage = () => {
		if (scorePercentage >= 90) return "Outstanding! You're a geography expert!";
		if (scorePercentage >= 70) return "Great job! You know your flags well!";
		if (scorePercentage >= 50) return "Good effort! Keep practicing!";
		return "Keep learning! You'll get better with practice.";
	};

	return (
		<motion.div
			className="finish-card-container"
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}>
			<motion.h1
				className="finish-title"
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}>
				Game Complete!
			</motion.h1>

			<motion.div
				className="score-circle"
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}>
				<div className="score-percentage">{scorePercentage}%</div>
				<div className="score-label">Score</div>
			</motion.div>

			<motion.p
				className="performance-message"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.6, duration: 0.5 }}>
				{getPerformanceMessage()}
			</motion.p>

			<motion.div
				className="stats-container"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.8, duration: 0.5 }}>
				<h2 className="stats-title">Your Results for {selectedContinent}</h2>

				<div className="stats-grid">
					<div className="stat-card total">
						<div className="stat-icon">🏁</div>
						<div className="stat-value">{gameStats.totalScore}</div>
						<div className="stat-label">Total Flags</div>
					</div>

					<div className="stat-card attempted">
						<div className="stat-icon">🎯</div>
						<div className="stat-value">{gameStats.attemptedScore}</div>
						<div className="stat-label">Attempted</div>
					</div>

					<div className="stat-card correct">
						<div className="stat-icon">✓</div>
						<div className="stat-value">{gameStats.correctGuesses}</div>
						<div className="stat-label">Correct</div>
					</div>

					<div className="stat-card incorrect">
						<div className="stat-icon">✗</div>
						<div className="stat-value">{gameStats.incorrectGuesses}</div>
						<div className="stat-label">Incorrect</div>
					</div>

					<div className="stat-card skipped">
						<div className="stat-icon">⏭️</div>
						<div className="stat-value">{gameStats.skippedFlags}</div>
						<div className="stat-label">Skipped</div>
					</div>
				</div>
			</motion.div>

			<motion.button
				className="play-again-button"
				onClick={onRestartClick}
				whileHover={{ scale: 1.05, backgroundColor: "var(--secondary-color)" }}
				whileTap={{ scale: 0.95 }}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 1, duration: 0.5 }}>
				Play Again
			</motion.button>
		</motion.div>
	);
}

export default FinishCard;

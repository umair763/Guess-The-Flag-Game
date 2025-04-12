"use client";

import { motion } from "framer-motion";
import "./LoadingScreen.css";

const LoadingScreen = () => {
	return (
		<div className="loading-container">
			<motion.div
				className="loading-spinner"
				animate={{
					rotate: 360,
				}}
				transition={{
					duration: 1.5,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				}}
			/>
			<motion.h2
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
				className="loading-text">
				Loading Flags...
			</motion.h2>
		</div>
	);
};

export default LoadingScreen;

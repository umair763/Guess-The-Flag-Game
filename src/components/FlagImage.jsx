"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FlagImage = ({ src, alt, className }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setIsLoaded(false);
		setError(false);
	}, [src]);

	return (
		<div className={`flag-image-wrapper ${className || ""}`}>
			{!isLoaded && !error && (
				<div className="flag-placeholder">
					<div className="flag-loading-spinner"></div>
				</div>
			)}

			{error && (
				<div className="flag-error">
					<span>Failed to load flag</span>
				</div>
			)}

			<motion.img
				src={src}
				alt={alt}
				className={`flag-img ${isLoaded ? "loaded" : ""}`}
				onLoad={() => setIsLoaded(true)}
				onError={() => setError(true)}
				initial={{ opacity: 0 }}
				animate={{ opacity: isLoaded ? 1 : 0 }}
				transition={{ duration: 0.3 }}
			/>
		</div>
	);
};

export default FlagImage;

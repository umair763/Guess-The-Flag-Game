// Helper function to dynamically import flag images
export const importFlagImage = async (countryCode) => {
	try {
		return await import(`../assets/flags/${countryCode.toLowerCase()}.png`);
	} catch (error) {
		console.error(`Failed to load flag for ${countryCode}:`, error);
		return null;
	}
};

// Shuffle array function
export const shuffleArray = (array) => {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};

import { useState, useEffect } from "react";
import { FlagInfoCard } from "./flag.info.card";
import { motion } from "framer-motion";
import { getFlagOptions } from "../utils/gameUtils";

export const GameBoard = () => {
  const [currentFlag, setCurrentFlag] = useState("🇫🇷"); // Placeholder flag
  const [options, setOptions] = useState(["France", "Germany", "Italy", "Spain"]);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleNext = () => {
    console.log("Next flag");
    // TODO: Update currentFlag and options
  };

  const handleSkip = () => {
    console.log("Skip flag");
    // TODO: Update currentFlag and options
  };

  return (
    <div className="w-full bg-gray-900 overflow-x-hidden">
      <div className="min-h-screen w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-4 sm:px-6 md:px-12">
        {/* Left section: Flag and Info Card as separate rows */}
        <div className="flex flex-col items-center justify-center h-full w-full">
          <motion.div
            className="flex items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg w-full max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-6xl sm:text-8xl">{currentFlag}</span>
          </motion.div>
          {showInfo && selectedCountry && (
            <motion.div
              className="w-full max-w-xl mx-auto flex justify-center mt-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4 }}
            >
              <div onClick={() => setShowInfo(false)} className="w-full">
                <FlagInfoCard country={selectedCountry} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Right section: Options + Buttons */}
        <motion.div
          className="flex flex-col justify-between bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {options.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500 transition"
                onClick={() => {
                  if (showInfo && selectedCountry === option) {
                    setShowInfo(false);
                  } else {
                    setSelectedCountry(option);
                    setShowInfo(true);
                  }
                }}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {/* Next / Skip Buttons */}
          <div className="flex justify-end gap-4 mt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSkip}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 transition"
            >
              Skip
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Next
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

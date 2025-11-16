import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Flag } from "lucide-react"; // Make sure lucide-react is installed
import { availableFlags, getFlagOptions } from "../utils/gameUtils";

const continents = [
  { name: "Africa", icon: Globe },
  { name: "Asia", icon: Globe },
  { name: "Europe", icon: Globe },
  { name: "North America", icon: Globe },
  { name: "South America", icon: Globe },
  { name: "Oceania", icon: Globe },
];

export const OptionsTray = () => {
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [numFlags, setNumFlags] = useState(10);
  const navigate = useNavigate();

  const flagOptions = selectedContinent ? getFlagOptions(selectedContinent) : [10, 20, 30, 40, 50];

  // Helper to snap slider to nearest allowed value
  const snapToOption = (val) => {
    return flagOptions.reduce((prev, curr) => (Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev));
  };

  const handleContinentSelect = (continent) => {
    setSelectedContinent(continent);
    // Adjust number of flags if continent doesn't have enough
    if (numFlags > availableFlags[continent]) {
      setNumFlags(availableFlags[continent]);
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg w-full max-w-2xl flex flex-col items-center gap-4 sm:gap-6 md:gap-8 mt-6 mx-auto">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center"
      >
        Guess the Flag Game
      </motion.h1>

      {/* Continent selection */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {continents.map(({ name, icon: Icon }) => (
          <motion.button
            key={name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleContinentSelect(name)}
            className={`cursor-pointer flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 font-medium text-xs sm:text-sm md:text-base text-white transition
              ${
                selectedContinent === name
                  ? "border-yellow-400 bg-yellow-600/40"
                  : "border-gray-500 hover:bg-gray-700/30"
              }`}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mb-1 sm:mb-2" />
            {name}
          </motion.button>
        ))}
      </motion.div>

      {/* Number of flags slider */}
      <motion.div
        className="w-full flex flex-col items-center gap-1 sm:gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <label className="text-xs sm:text-sm md:text-base text-white font-medium mb-2">
          Number of flags: {numFlags}
        </label>
        <div className="relative w-full mb-4" style={{ height: 32 }}>
          {/* Numbers above slider, spaced evenly */}
          {flagOptions.map((opt, idx) => (
            <span
              key={opt}
              className="absolute text-xs text-white"
              style={{
                left: `${(idx / (flagOptions.length - 1)) * 100}%`,
                transform: "translateX(-50%)",
                top: 0,
              }}
            >
              {opt}
            </span>
          ))}
          <input
            type="range"
            min={flagOptions[0]}
            max={flagOptions[flagOptions.length - 1]}
            step={1}
            value={numFlags}
            onChange={(e) => setNumFlags(snapToOption(Number(e.target.value)))}
            className="w-full h-1 sm:h-2 rounded-lg appearance-none bg-gray-400/50 accent-yellow-400 cursor-pointer mt-4"
            style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
          />
        </div>
      </motion.div>

      {/* Start Game Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-yellow-400 cursor-pointer text-gray-900 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg shadow-lg hover:bg-yellow-500 transition"
        onClick={() => {
          if (selectedContinent) {
            navigate("/game", {
              state: {
                continent: selectedContinent,
                numFlags,
              },
            });
          } else {
            alert("Please select a continent!");
          }
        }}
      >
        Start Game
      </motion.button>
    </div>
  );
};

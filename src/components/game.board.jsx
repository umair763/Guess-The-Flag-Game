import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlagInfoCard } from "./flag.info.card";
import { motion } from "framer-motion";
import { generateQuestionSet, getCountryByName } from "../utils/gameUtils";
import { ArrowRight, ArrowUp } from "lucide-react";

export const GameBoard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { continent, numFlags } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [hintData, setHintData] = useState(null);

  // Game state
  const [gameState, setGameState] = useState({
    total: numFlags || 0,
    attempted: 0,
    skipped: 0,
    correct: 0,
    wrong: 0,
  });

  const currentQuestion = questions[currentIndex];

  // Initialize game - load questions
  useEffect(() => {
    if (!continent || !numFlags) {
      console.warn("Missing continent or numFlags, redirecting to home");
      navigate("/");
      return;
    }

    console.log("Initializing game with:", { continent, numFlags });

    const loadQuestions = async () => {
      try {
        console.log("Generating question set...");
        const questionSet = await generateQuestionSet(continent, numFlags);
        console.log("Questions generated:", questionSet.length);
        console.log("First question:", questionSet[0]);
        setQuestions(questionSet);
      } catch (error) {
        console.error("Error loading questions:", error);
        alert("Failed to load game. Please try again.");
        navigate("/");
      }
    };

    loadQuestions();
  }, [continent, numFlags, navigate]);

  // Handle option click - show hint
  const handleOptionClick = async (option) => {
    // If clicking the same option, toggle hint visibility
    if (selectedOption === option) {
      setShowInfo(!showInfo);
      return;
    }

    setSelectedOption(option);

    // Fetch hint data for selected option
    const hint = await getCountryByName(option);
    setHintData(hint);
    setShowInfo(true);
  };

  // Handle Next button
  const handleNext = () => {
    if (!selectedOption) {
      alert("Please select an option or click Skip!");
      return;
    }

    // Check if answer is correct
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    // Calculate updated state
    const updatedState = {
      ...gameState,
      attempted: gameState.attempted + 1,
      correct: gameState.correct + (isCorrect ? 1 : 0),
      wrong: gameState.wrong + (isCorrect ? 0 : 1),
    };

    // Check if this is the last question
    if (currentIndex + 1 >= questions.length) {
      // Navigate to results with final state
      navigate("/results", { state: { results: updatedState } });
    } else {
      // Update state and move to next
      setGameState(updatedState);
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowInfo(false);
      setHintData(null);
    }
  };

  // Handle Skip button
  const handleSkip = () => {
    // Calculate updated state
    const updatedState = {
      ...gameState,
      skipped: gameState.skipped + 1,
    };

    // Check if this is the last question
    if (currentIndex + 1 >= questions.length) {
      // Navigate to results with final state
      navigate("/results", { state: { results: updatedState } });
    } else {
      // Update state and move to next
      setGameState(updatedState);
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowInfo(false);
      setHintData(null);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="w-full bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 overflow-x-hidden min-h-screen">
      <div className="min-h-screen w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-2 sm:px-3 md:px-6">
        {/* Left section: Flag and Info Card as separate rows */}
        <div className="flex flex-col items-center justify-center h-full w-full -mt-6 sm:-mt-12">
          {/* Progress indicator */}
          <div className="text-white text-xs sm:text-sm mb-1 font-semibold">
            Question {currentIndex + 1} of {questions.length}
          </div>

          <motion.div
            className="flex items-center justify-center rounded-2xl p-0 shadow-lg w-full mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={currentIndex}
          >
            <motion.img
              src={currentQuestion.flagUrl}
              alt="Flag"
              className={`w-full object-contain transition-all duration-300`}
              animate={{ height: showInfo ? "9.5rem" : "18rem" }}
              style={{ maxHeight: "32vw", minHeight: "4rem" }}
            />
          </motion.div>
          {showInfo && hintData && (
            <motion.div
              className="w-full max-w-xs sm:max-w-xl mx-auto flex justify-center mt-2 sm:mt-3"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4 }}
            >
              <div onClick={() => setShowInfo(false)} className="w-full cursor-pointer">
                <FlagInfoCard country={hintData} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Right section: Options + Buttons */}
        <motion.div
          className="flex flex-col justify-between bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-6 shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Options Grid */}
          <div className={`grid grid-cols-2 gap-2 sm:gap-4 mb-2 sm:mb-4 ${showInfo ? "-mt-3 sm:mt-0" : "mt-0 sm:mt-0"}`}>
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.08, boxShadow: "0 0 10px rgba(20, 184, 166, 0.25)" }}
                whileTap={{ scale: 0.97 }}
                className={`font-semibold text-xs sm:text-base md:text-base lg:text-base py-1 sm:py-3 px-2 sm:px-4 rounded-xl shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400
                  ${
                    selectedOption === option
                      ? "bg-teal-500 text-white border-2 border-teal-300 ring-2 ring-teal-400"
                      : "bg-yellow-300 text-gray-900 hover:bg-yellow-400 hover:shadow-xl"
                  }
                `}
                onClick={() => handleOptionClick(option)}
                aria-pressed={selectedOption === option}
                tabIndex={0}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {/* Next / Skip Buttons */}
          <div className="flex justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 select-none mb-16 md:mb-0 lg:mb-0">
            {/* Skip Button */}
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0 0 12px rgba(0, 150, 255, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSkip}
              className="text-xs sm:text-base h-10 md:h-12 lg:h-12 md:text-base lg:text-base relative px-10 py-3 rounded-full font-semibold text-cyan-300 bg-gray-900/40 border border-cyan-400/40 backdrop-blur-md transition-all hover:bg-gray-800/60 overflow-hidden cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="relative z-10 tracking-wide">Skip</span>
              <ArrowUp size={22} className="text-cyan-300" />
              {/* Neon Glow Line */}
              <span className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400/70 blur-sm"></span>
            </motion.button>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 14px rgba(0, 255, 150, 0.65)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="text-xs sm:text-base h-10 md:h-12 lg:h-12 md:text-base lg:text-base relative px-12 py-3  rounded-full font-bold text-black bg-emerald-400 border border-emerald-300/60 shadow-lg hover:bg-emerald-300 transition-all overflow-hidden cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="relative z-10 tracking-wider">Next</span>
              <ArrowRight size={22} className="text-emerald-700" />
              {/* Animated Glow Behind */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 bg-emerald-300 blur-xl"
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

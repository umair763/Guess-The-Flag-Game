import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlagInfoCard } from "./flag.info.card";
import { motion } from "framer-motion";
import { generateQuestionSet, getCountryByName } from "../utils/gameUtils";

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
    <div className="w-full bg-gray-900 overflow-x-hidden">
      <div className="min-h-screen w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-4 sm:px-6 md:px-12">
        {/* Left section: Flag and Info Card as separate rows */}
        <div className="flex flex-col items-center justify-center h-full w-full">
          {/* Progress indicator */}
          <div className="text-white text-sm mb-1 font-semibold">
            Question {currentIndex + 1} of {questions.length}
          </div>

          <motion.div
            className="flex items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl p-0 shadow-lg w-full mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={currentIndex}
          >
            <motion.img
              src={currentQuestion.flagUrl}
              alt="Flag"
              className={`w-full object-contain transition-all duration-300`}
              animate={{ height: showInfo ? "8.5rem" : "21rem" }}
            />
          </motion.div>
          {showInfo && hintData && (
            <motion.div
              className="w-full max-w-xl mx-auto flex justify-center mt-4"
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
          className="flex flex-col justify-between bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`font-semibold py-3 px-4 rounded-lg shadow-md transition ${
                  selectedOption === option
                    ? "bg-blue-500 text-white border-2 border-blue-300"
                    : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                }`}
                onClick={() => handleOptionClick(option)}
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

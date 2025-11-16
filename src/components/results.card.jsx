import React from "react";
import { CheckCircle, XCircle, Clock, ClipboardList, Pencil } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const ResultsCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedResults = location?.state?.results;

  const results = passedResults || {
    total: 10,
    attempted: 0,
    skipped: 0,
    correct: 0,
    wrong: 0,
  };

  const scorePercent = results.total > 0 ? Math.round((results.correct / results.total) * 100) : 0;
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (scorePercent / 100) * circumference;

  return (
    <div className="bg-gray-900/70 backdrop-blur-xl rounded-3xl p-3 sm:p-6 mx-auto text-white shadow-xl w-full max-w-full sm:max-w-md md:max-w-2xl lg:max-w-3xl -mt-16">
      {/* Circular Globe / Progress */}
      <div className="flex justify-center mb-4 sm:mb-6 relative">
        <svg
          height={radius * 1.2}
          width={radius * 1.2}
          className="transform -rotate-90 w-30 h-30"
        >
          <circle
            stroke="#1E3A8A"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#3B82F6"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference + " " + circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-lg sm:text-2xl md:text-3xl font-bold">{scorePercent}%</span>
          <span className="block text-xs sm:text-sm text-gray-300">Score</span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6 text-xs sm:text-base">
        <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-xl p-3 hover:bg-gray-700/70 transition">
          <ClipboardList className="w-6 h-6 text-blue-400 mb-1" />
          <div className="font-semibold">Total MCQs</div>
          <div>{results.total}</div>
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-xl p-3 hover:bg-gray-700/70 transition">
          <Pencil className="w-6 h-6 text-yellow-400 mb-1" />
          <div className="font-semibold">Attempted</div>
          <div>{results.attempted}</div>
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-xl p-3 hover:bg-gray-700/70 transition">
          <Clock className="w-6 h-6 text-gray-400 mb-1" />
          <div className="font-semibold">Skipped</div>
          <div>{results.skipped}</div>
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-xl p-3 hover:bg-gray-700/70 transition">
          <XCircle className="w-6 h-6 text-red-400 mb-1" />
          <div className="font-semibold">Wrong</div>
          <div>{results.wrong}</div>
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-xl p-3 hover:bg-gray-700/70 transition">
          <CheckCircle className="w-6 h-6 text-green-400 mb-1" />
          <div className="font-semibold">Correct</div>
          <div>{results.correct}</div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 sm:mt-6 flex justify-center">
        <button
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 transition px-4 sm:px-6 py-2 rounded-xl font-bold text-xs sm:text-base shadow-lg"
          onClick={() => navigate("/")}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

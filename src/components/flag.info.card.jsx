import React from "react";

export const FlagInfoCard = ({ country }) => {
  if (!country) {
    return (
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 shadow-lg mx-auto text-white text-center">
        <p>Loading hint...</p>
      </div>
    );
  }

  const { capital, population, area, region, subregion, timezones, bordersCount, languagesCount } = country;

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 shadow-lg mx-auto text-white relative overflow-hidden">
      {/* Futuristic Glow Border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-yellow-300/40 animate-pulse"
        style={{ boxShadow: "0 0 32px 8px rgba(255, 255, 0, 0.12)" }}
      ></div>
      {/* Card Glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: "0 0 60px 0px rgba(255, 255, 0, 0.08)" }}
      ></div>
      <h3 className="text-lg font-bold mb-2 text-center text-yellow-300 drop-shadow-lg tracking-wide">
        Hint (Country Details)
      </h3>
      {/* Info - DO NOT show country name */}
      <div className="space-y-2 text-sm sm:text-base">
        <div className="flex justify-between items-center border-b border-yellow-200/30 pb-1">
          <span className="font-semibold text-yellow-100">Capital:</span>
          <span className="text-yellow-50">{capital || "Unknown"}</span>
        </div>
        <div className="flex justify-between items-center border-b border-yellow-200/30 pb-1">
          <span className="font-semibold text-yellow-100">Population:</span>
          <span className="text-yellow-50">{population?.toLocaleString() || "Unknown"}</span>
        </div>
        <div className="flex justify-between items-center border-b border-yellow-200/30 pb-1">
          <span className="font-semibold text-yellow-100">Area:</span>
          <span className="text-yellow-50">{area ? `${area.toLocaleString()} km²` : "Unknown"}</span>
        </div>
        <div className="flex justify-between items-center border-b border-yellow-200/30 pb-1">
          <span className="font-semibold text-yellow-100">Region:</span>
          <span className="text-yellow-50">{region || "Unknown"}</span>
        </div>
        {subregion && (
          <div className="flex justify-between items-center border-b border-yellow-200/30 pb-1">
            <span className="font-semibold text-yellow-100">Subregion:</span>
            <span className="text-yellow-50">{subregion}</span>
          </div>
        )}
        <div className="flex justify-between items-center border-b border-yellow-200/30 pb-1">
          <span className="font-semibold text-yellow-100">Languages:</span>
          <span className="text-yellow-50">{languagesCount || 0} languages</span>
        </div>
        {timezones && timezones.length > 0 && (
          <div className="flex justify-between items-center border-b border-yellow-200/30 pb-1">
            <span className="font-semibold text-yellow-100">Timezone:</span>
            <span className="text-yellow-50 text-xs">{timezones[0]}</span>
          </div>
        )}
      </div>
    </div>
  );
};

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
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 shadow-lg mx-auto text-white">
      <h3 className="text-lg font-bold mb-2 text-center text-yellow-300">Hint (Country Details)</h3>

      {/* Info - DO NOT show country name */}
      <div className="space-y-2 text-sm sm:text-base">
        <div className="flex justify-between">
          <span className="font-semibold">Capital:</span>
          <span>{capital || "Unknown"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Population:</span>
          <span>{population?.toLocaleString() || "Unknown"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Area:</span>
          <span>{area ? `${area.toLocaleString()} km²` : "Unknown"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Region:</span>
          <span>{region || "Unknown"}</span>
        </div>

        {subregion && (
          <div className="flex justify-between">
            <span className="font-semibold">Subregion:</span>
            <span>{subregion}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="font-semibold">Borders:</span>
          <span>{bordersCount || 0} countries</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Languages:</span>
          <span>{languagesCount || 0} languages</span>
        </div>

        {timezones && timezones.length > 0 && (
          <div className="flex justify-between">
            <span className="font-semibold">Timezone:</span>
            <span className="text-xs">{timezones[0]}</span>
          </div>
        )}
      </div>
    </div>
  );
};

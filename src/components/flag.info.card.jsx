import React from "react";

const dummyCountry = {
  capital: "Canberra",
  population: 25687041,
  area: 7692024,
  timezones: ["UTC+05:00", "UTC+06:30", "UTC+07:00", "UTC+08:00", "UTC+09:30", "UTC+10:00"],
  languages: [{ name: "English" }, { name: "Samoan" }],
  flag: "https://flagcdn.com/au.svg",
};

export const FlagInfoCard = ({ country = dummyCountry }) => {
  const { capital, population, area, timezones, languages, flag } = country || {};

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg max-w-md mx-auto text-white">
      {/* Info */}
      <div className="space-y-2 text-sm sm:text-base md:text-lg">
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
          <span className="font-semibold">Timezones:</span>
          <span>{timezones?.join(", ") || "Unknown"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Languages:</span>
          <span>{languages?.map((l) => l.name).join(", ") || "Unknown"}</span>
        </div>
      </div>
    </div>
  );
};

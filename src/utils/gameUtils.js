export const availableFlags = {
  Africa: 54,
  Asia: 50,
  Europe: 44,
  "North America": 23,
  "South America": 12,
  Oceania: 14,
};

export const getFlagOptions = (continent) => {
  const max = availableFlags[continent];
  if (max <= 10) return [max];
  const quarter = Math.floor(max / 4);
  return [quarter, Math.floor(max / 2), Math.floor((3 * max) / 4), max];
};


import axios from "axios";

// Use Countries Now API - reliable, CORS-friendly, no field restrictions
const API_URL = "https://countriesnow.space/api/v0.1/countries/flag/images";

// Cache for countries data
let countriesCache = null;

// ============= CORE API FUNCTIONS =============

// Fetch all countries from API
export const fetchAllCountries = async () => {
  if (countriesCache) {
    console.log("Using cached countries:", countriesCache.length);
    return countriesCache;
  }

  try {
    console.log("Fetching countries from API:", API_URL);
    const response = await axios.get(API_URL);
    console.log("API Response status:", response.status);

    const countries = response.data?.data;

    if (!Array.isArray(countries)) {
      console.error("API did not return an array:", countries);
      return [];
    }

    // Fetch additional data from REST Countries GraphQL as fallback
    const detailedCountries = await Promise.all(
      countries.map(async (country) => {
        try {
          // Get detailed info from REST Countries v3.1
          const detailResponse = await axios.get(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(country.name)}?fullText=true`
          );
          const detail = detailResponse.data[0];

          return {
            name: detail.name.common,
            region: detail.region,
            subregion: detail.subregion,
            capital: detail.capital?.[0] || "N/A",
            population: detail.population,
            area: detail.area,
            flags: {
              svg: detail.flags?.svg || country.flag,
              png: detail.flags?.png || country.flag,
            },
            flag: detail.flags?.svg || detail.flags?.png || country.flag,
            timezones: detail.timezones || [],
            languages: detail.languages ? Object.values(detail.languages) : [],
            borders: detail.borders || [],
            alpha3Code: detail.cca3,
          };
        } catch (error) {
          // Fallback to basic data if detailed fetch fails
          return {
            name: country.name,
            region: "Unknown",
            subregion: "Unknown",
            capital: "N/A",
            population: 0,
            area: 0,
            flags: { svg: country.flag, png: country.flag },
            flag: country.flag,
            timezones: [],
            languages: [],
            borders: [],
            alpha3Code: country.iso3 || "",
          };
        }
      })
    );

    countriesCache = detailedCountries.filter((c) => c.region !== "Unknown");
    console.log("Cached", countriesCache.length, "countries");
    return countriesCache;
  } catch (error) {
    console.error("Error fetching countries:", error);
    console.error("Error details:", error.response?.data || error.message);
    return [];
  }
};

// Filter countries by continent/region
export const filterByContinent = (countries, continent) => {
  const regionMap = {
    Africa: "Africa",
    Asia: "Asia",
    Europe: "Europe",
    "North America": "Americas",
    "South America": "Americas",
    Oceania: "Oceania",
  };

  const region = regionMap[continent];
  let filtered = countries.filter((c) => c.region === region);

  // Further filter Americas
  if (continent === "North America") {
    filtered = filtered.filter(
      (c) => c.subregion === "Northern America" || c.subregion === "Central America" || c.subregion === "Caribbean"
    );
  } else if (continent === "South America") {
    filtered = filtered.filter((c) => c.subregion === "South America");
  }

  return filtered;
};

// Get country count for a continent
export const getCountryCount = async (continent) => {
  console.log("Getting country count for:", continent);
  const countries = await fetchAllCountries();
  console.log("Total countries fetched:", countries.length);
  const filtered = filterByContinent(countries, continent);
  console.log("Filtered countries for", continent, ":", filtered.length);
  console.log(
    "Sample filtered countries:",
    filtered.slice(0, 3).map((c) => c.name)
  );
  return filtered.length;
};

// Get slider options based on available countries
export const getFlagOptions = (availableCount) => {
  if (availableCount <= 4) return [availableCount];

  const min = 4;
  const max = availableCount;

  if (max <= 8) return [min, max];

  const mid1 = Math.floor((min + max) / 3);
  const mid2 = Math.floor(((min + max) * 2) / 3);

  const options = [min, mid1, mid2, max].filter((n, idx, arr) => arr.indexOf(n) === idx && n >= min && n <= max);

  return options.sort((a, b) => a - b);
};

// ============= GAME LOGIC FUNCTIONS =============

// Get a random flag from countries array
export const getRandomFlag = (countries) => {
  if (!countries || countries.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
};

// Generate 4 options: 1 correct + 3 wrong (all from same continent)
export const getOptionsForFlag = (correctCountry, allCountries) => {
  // Get 3 random wrong options
  const wrongCountries = allCountries
    .filter((c) => c.name !== correctCountry.name)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Combine correct + wrong options
  const options = [correctCountry, ...wrongCountries];

  // Shuffle to randomize position
  return shuffleOptions(options);
};

// Shuffle array
export const shuffleOptions = (options) => {
  return options.sort(() => 0.5 - Math.random());
};

// Generate full question set for the game
export const generateQuestionSet = async (continent, limit) => {
  const allCountries = await fetchAllCountries();
  const continentCountries = filterByContinent(allCountries, continent);

  // Shuffle and take 'limit' countries
  const shuffled = shuffleOptions([...continentCountries]);
  const selectedCountries = shuffled.slice(0, Math.min(limit, continentCountries.length));

  // Generate questions
  const questions = selectedCountries.map((country) => {
    const options = getOptionsForFlag(country, continentCountries);

    return {
      flagUrl: country.flags?.svg || country.flags?.png || country.flag,
      correctCountry: country,
      correctAnswer: country.name,
      options: options.map((opt) => opt.name),
      alpha3Code: country.alpha3Code,
    };
  });

  return questions;
};

// Fetch country details for hint (by alpha3Code)
export const getCountryDetailsForHint = async (alpha3Code) => {
  try {
    const allCountries = await fetchAllCountries();
    const country = allCountries.find((c) => c.alpha3Code === alpha3Code);

    if (!country) return null;

    return {
      capital: country.capital,
      population: country.population,
      area: country.area,
      region: country.region,
      subregion: country.subregion,
      timezones: country.timezones,
      languages: country.languages,
      borders: country.borders,
      bordersCount: country.borders ? country.borders.length : 0,
      languagesCount: country.languages ? country.languages.length : 0,
    };
  } catch (error) {
    console.error("Error fetching country details:", error);
    return null;
  }
};

// Fetch country by name (for hint when clicking option)
export const getCountryByName = async (countryName) => {
  const allCountries = await fetchAllCountries();
  const country = allCountries.find((c) => c.name === countryName);

  if (!country) return null;

  return {
    capital: country.capital,
    population: country.population,
    area: country.area,
    region: country.region,
    subregion: country.subregion,
    timezones: country.timezones,
    languages: country.languages,
    borders: country.borders,
    bordersCount: country.borders ? country.borders.length : 0,
    languagesCount: country.languages ? country.languages.length : 0,
    alpha3Code: country.alpha3Code,
  };
};

// ============= RESULTS CALCULATION =============

// Calculate final results
export const calculateResults = (attempted, skipped, correct, wrong) => {
  const total = attempted + skipped;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return {
    total,
    attempted,
    skipped,
    correct,
    wrong,
    percentage,
  };
};

// Get final formatted results
export const getFinalResults = (gameState) => {
  return calculateResults(gameState.attempted, gameState.skipped, gameState.correct, gameState.wrong);
};

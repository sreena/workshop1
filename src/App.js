import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const url = "https://countriesnow.space/api/v0.1/countries";
  const [countries, setCountries] = useState([]);
  const [selCountry, setSelectCountry] = useState("");
  const [cities, setCities] = useState(null);
  const [selCity, setSelectCity] = useState("");

  const fetchCountries = async () => {
    try {
      const country = await axios.get(url);
      console.log(country.data.data);
      setCountries(country.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCities = (selVal) => {
    setSelectCountry(selVal);
    const findCities = countries.find((country) => country.country === selVal);
    console.log("cities", findCities);
    setCities(findCities.cities);
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  return (
    <div className="App-header">
      <h3>Select Country </h3>
      <div>
        {countries && (
          <select
            onChange={(e) => fetchCities(e.target.value)}
            value={selCountry}
          >
            <option selected disabled hidden>
              Select Country
            </option>
            {countries.map((country) => (
              <option
                key={`${country.country}-${Date.now()}`}
                value={country.country}
              >
                {country.country}
              </option>
            ))}
          </select>
        )}

        {cities && (
          <select
            onChange={(e) => setSelectCity(e.target.value)}
            value={selCity}
          >
            <option selected disabled hidden>
              select city
            </option>
            {cities.map((city) => (
              <option value={city}>{city}</option>
            ))}
          </select>
        )}

        <button>Go</button>
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import './App.scss';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    // Code inside here will run once
    // when the component loads and not again

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United Kingdom, United States
            value: country.countryInfo.iso2 //UK, US
          }
          ));

          setCountries(countries);
        });
    };

    getCountriesData();

    // or will run when the below var changes (updates)
  }, []);

  // grab the selected country
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(res => res.json())
    .then(data => {
      
    });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>
          <FormControl className="app__dropdown">

            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >

              {/* add an option WORLDWIDE &
           mappig through all the countries */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>

        {/* INFO BOXes */}
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" />
          <InfoBox title="Recovered" />
          <InfoBox title="Deaths" />
        </div>

        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

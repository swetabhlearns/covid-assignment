import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Search from "./Search";

import Table from "./Table";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState();
  const [tableData, setTableData] = useState([]);
  const [currentSelected, setCurrent] = useState({});
  const [global, setGlobal] = useState({});
  const [days, setDays] = useState(7);
  const [coronaCountAr, setCoronaCountAr] = useState([]);
  const [label, setLabel] = useState([]);
  useEffect(() => {
    getCountriesData();
  }, []);
  const getCountriesData = () => {
    fetch("https://api.covid19api.com/summary")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        const Countries = data.Countries.map((country) => ({
          name: country.Country,
          value: country.CountryCode,
          newCases: country.NewConfirmed,
          totalCases: country.TotalConfirmed,
          dailyRecovery: country.NewRecovered,
          totalRecovered: country.TotalRecovered,
          newDeaths: country.NewDeaths,
          totalDeaths: country.TotalDeaths,
          slug: country.Slug,
        }));

        const Global = {
          name: "Global",
          value: "global",
          newCases: data.Global.NewConfirmed,
          totalCases: data.Global.TotalConfirmed,
          dailyRecovery: data.Global.NewRecovered,
          totalRecovered: data.Global.TotalRecovered,
          newDeaths: data.Global.NewDeaths,
          totalDeaths: data.Global.TotalDeaths,
        };
        setGlobal(Global);
        setCountries([Global, ...Countries]);
        setTableData(Countries);
        onCountryChange(Global);
      });
  };

  const onCountryChange = (event) => {
    setCurrent(event);
    setCountry(event.value);
    getCoronaReportByDateRange(event.slug);
  };

  const getCoronaReportByDateRange = async (slug) => {
    console.log({ currentSelected, slug });
    if (slug)
      await fetch(`https://api.covid19api.com/country/${slug}/status/confirmed`)
        .then((response) => response.json())
        .then((data) => {
          data = data.slice(data.length - days);
          const cases = data.reduce((result, value) => {
            return (result += value.Cases);
          }, 0);
          console.log(cases);
          const yAxisCoronaCount = data.map((d) => d.Cases);
          const xAxisLabel = data.map((d) => d.Date);
          setCoronaCountAr(yAxisCoronaCount);
          setLabel(xAxisLabel);
        });
  };

  const daysHandler = (e) => {
    setDays(e.target.value);
    getCoronaReportByDateRange(currentSelected.slug);
  };

  const handleSearch = (value) => {
    let newData = [];
    if (value)
      newData = countries
        .slice(1)
        .filter((country) =>
          country.name.toLowerCase().includes(value.toLowerCase())
        );
    else newData = countries.slice(1);
    setTableData(newData);
  };
  return (
    <div className="app">
      <div className="app_flex">
        <div className="app_left">
          <h1>
            {country === "global"
              ? "WORLDWIDE CORONA REPORT"
              : `Covid Status of: ${currentSelected.name} `}
          </h1>
          <div className="app_header">
            {/* Header */}

            <div className="app_stats">
              {(currentSelected || {}).value !== "global" ? (
                <>
                  <InfoBox
                    title="Coronavirus Cases"
                    cases={currentSelected.newCases}
                    total={currentSelected.totalCases}
                  />

                  <InfoBox
                    title="Recovered"
                    cases={currentSelected.dailyRecovery}
                    total={currentSelected.totalRecovered}
                  />

                  <InfoBox
                    title="Deaths"
                    cases={currentSelected.newDeaths}
                    total={currentSelected.totalDeaths}
                  />
                </>
              ) : (
                <>
                  <InfoBox
                    title="Coronavirus Cases"
                    cases={global.newCases}
                    total={global.totalCases}
                  />

                  <InfoBox
                    title="Recovered"
                    cases={global.dailyRecovery}
                    total={global.totalRecovered}
                  />

                  <InfoBox
                    title="Deaths"
                    cases={global.newDeaths}
                    total={global.totalDeaths}
                  />
                </>
              )}

              {/* InfoBoxes */}
            </div>
          </div>
        </div>
        <Card className="app_right">
          <CardContent>
            <div>
              <Search data={countries} handleSearch={handleSearch} />
              <h3>Live Cases by Countries</h3>
              <Table data={tableData} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="app_btn">
        <FormControl>
          <Select
            variant="outlined"
            value={currentSelected.value}
            key={currentSelected.value}
          >
            {countries.map((country, index) => (
              <MenuItem
                onClick={() => onCountryChange(country)}
                key={country.value}
                value={country.value}
              >
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select variant="outlined" value={days} onChange={daysHandler}>
            <MenuItem value="7">Last 7 days</MenuItem>
            <MenuItem value="30">Last 30 days</MenuItem>
            <MenuItem value="90">Last 90 days</MenuItem>
          </Select>
        </FormControl>
        {/* // <SearchBar /> */}
      </div>

      <div className="app_graph">
        {country === "global" ? (
          <h1>SELECT A COUNTRY</h1>
        ) : (
          <LineGraph yAxis={coronaCountAr} label={label} />
        )}
      </div>

      {/* Graph */}
    </div>
  );
}

export default App;

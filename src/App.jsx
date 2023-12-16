import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CountryDetailsPage from "./CountryDetailsPage";

import moon from "./assets/icons8-moon-60.png";
import sun from "./assets/icons8-sun-60.png";

function App() {
  const [apiData, setApiData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [apiLoading, setApiLoading] = useState(true);

  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");

  const [apiLink, setApiLink] = useState(`https://restcountries.com/v3.1/all`);

  const [themeToggled, setThemeToggled] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [countryFound, setCountryFound] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(apiLink);

      if (!response.ok) {
        if (response.status === 404) {
          setCountryFound(false);
          throw new Error("Country not found");
        } else {
          throw new Error("A problem occurred while loading");
        }
      } else {
        setCountryFound(true);
      }

      const data = await response.json();

      setApiData(data);
      setApiError(null);

      console.log(apiData);
    } catch (error) {
      setApiError(error);
    } finally {
      setApiLoading(false);
    }
  };

  const toggleTheme = () => {
    if (themeToggled) {
      setThemeToggled(false);
    } else {
      setThemeToggled(true);
    }
  };

  const changeRegion = (e) => {
    setRegion(e.target.value);

    if (e.target.value === "all") {
      setApiLink(`https://restcountries.com/v3.1/all`);
    } else {
      setApiLink(`https://restcountries.com/v3.1/region/${e.target.value}`);
    }

    console.log(e.target.value);
  };

  const searchForCountry = (e) => {
    e.preventDefault();

    setApiLink(`https://restcountries.com/v3.1/name/${country}`);
    setCountry("");
  };

  const handleCountryDetails = (e) => {
    const cardContainerValue = e.target.closest(".cardContainer").dataset.value;

    //setCountry(cardContainerValue);
    setApiLink(`https://restcountries.com/v3.1/name/${cardContainerValue}`);

    console.log(cardContainerValue);
  };

  //FETCHING API DATA
  useEffect(() => {
    fetchData();
  }, [apiLoading, apiLink]);

  //SETTING STICKY NAV
  useEffect(() => {
    const headerHeight = document.getElementById("header").offsetHeight;

    const handleScroll = () => {
      if (window.scrollY > headerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  // //COUNTRY NOT FOUND
  // useState(() => {
  //   if (!countryFound) {
  //     alert(apiError);
  //   }
  // }, [countryFound]);

  return (
    <Router>
      <div className={`AppBody ${themeToggled ? "darkMode" : "lightMode"}`}>
        <header
          id="header"
          className={`${themeToggled ? "headerDark" : "headerLight"} ${
            isSticky ? "stickyHeader" : ""
          }`}
        >
          <h1 className="headerHeading">Where in the world?</h1>

          <div className="themeGrp" onClick={toggleTheme}>
            <img
              src={themeToggled ? sun : moon}
              alt={themeToggled ? "sun icon" : "moon icon"}
              className="themeIcon"
            />

            <p className="themeText">
              {themeToggled ? "Light Mode" : "Dark Mode"}
            </p>
          </div>
        </header>

        <Switch>
          <Route exact path="/">
            <main>
              <form
                action=""
                className="searchSection"
                onSubmit={searchForCountry}
              >
                <input
                  type="text"
                  placeholder="Search for a country..."
                  className={`searchBar ${
                    themeToggled ? "bg-darkModeElements" : "bg-white"
                  }`}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />

                <select
                  name="regions"
                  id="regions"
                  className={themeToggled ? "bg-slate-700" : "bg-white"}
                  onChange={changeRegion}
                >
                  <option value="">Filter by region</option>
                  <option value="all">All</option>
                  <option value="africa">Africa</option>
                  <option value="america">America</option>
                  <option value="asia">Asia</option>
                  <option value="europe">Europe</option>
                  <option value="oceania">Oceania</option>
                </select>
              </form>

              {apiData === null && (
                <p className="font-bold text-5xl mt-32 text-center">
                  Loading...
                </p>
              )}

              {apiData !== null && apiData !== undefined && (
                <div className="resultsContainer">
                  {apiData.map((element, index) => (
                    <Link to="/CountryDetailsPage" key={index}>
                      <div
                        className={`cardContainer ${
                          themeToggled ? "bg-darkModeElements" : "bg-white"
                        }`}
                        data-value={element.name.common}
                        onClick={handleCountryDetails}
                      >
                        <img
                          src={element.flags.png}
                          alt={element.name.common}
                          className="countryFlag"
                        />

                        <div className="countryDetails ">
                          <h1 className="countryName">{element.name.common}</h1>

                          <div className="countryStat">
                            <p className="statHeading">population:</p>
                            <p className="statDetail">
                              {element.population.toLocaleString()}
                            </p>
                          </div>

                          <div className="countryStat">
                            <p className="statHeading">region:</p>
                            <p className="statDetail">{element.region}</p>
                          </div>

                          <div className="countryStat">
                            <p className="statHeading">capital:</p>
                            <p className="statDetail">{element.capital}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </main>
          </Route>

          <Route path="/CountryDetailsPage">
            <CountryDetailsPage
              apiData={apiData}
              themeToggled={themeToggled}
              fetchData={fetchData}
            ></CountryDetailsPage>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

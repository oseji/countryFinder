import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { useState, useEffect, useRef } from "react";
import CountryDetails from "./CountryDetails";
import moon from "./assets/icons8-moon-60.png";
import sun from "./assets/icons8-sun-60.png";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [themeText, setThemeText] = useState("Dark mode");
  const [themeImg, setThemeImg] = useState(moon);
  const [countryName, setCountryName] = useState("");
  const [region, setRegion] = useState("");
  const [countryDetails, setCountryDetails] = useState("");

  const appBodyRef = useRef(null);
  const headerRef = useRef(null);
  const inputRef = useRef(null);
  const regionsRef = useRef(null);
  const cardContainerRef = useRef(null);

  const apiLinkAll = `https://restcountries.com/v3.1/all`;
  const [link, setLink] = useState(apiLinkAll);

  //handling data
  useEffect(() => {
    console.log("useEffect Ran");

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(link);

        if (!response.ok) {
          throw new Error(`Network response wasnt okay`);
        }
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        setError(error);
        // if (error) {
        //   alert(error.message);
        // }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [region, link]);

  // useEffect(() => {
  //   console.log(`COUNTRY NAME : ${countryName}`);
  //   console.log(`REGION : ${region}`);
  //   console.log(link);
  // }, [countryName, region]);

  //CHANGING REGION
  const handleRegion = (e) => {
    e.preventDefault();

    setRegion(e.target.value);
    console.log(`REGION : ${region}`);

    if (e.target.value === "all") {
      setLink(apiLinkAll);
    } else {
      setLink(`https://restcountries.com/v3.1/region/${e.target.value}`);
    }
  };

  //CHANGING THEME
  const handleTheme = (e) => {
    console.log(e.target);

    const appBody = appBodyRef.current;
    const headerNav = headerRef.current;
    const inputContainer = inputRef.current;
    const regionContainer = regionsRef.current;
    const cardContainer = cardContainerRef.current;

    appBody.classList.toggle("appLight");
    appBody.classList.toggle("appDark");

    headerNav.classList.toggle("headerLight");
    headerNav.classList.toggle("headerDark");

    cardContainer.classList.toggle("cardContainerLight");
    cardContainer.classList.toggle("cardContainerDark");

    regionContainer.classList.toggle("regionsDark");
    inputContainer.classList.toggle("inputDark");

    //console.log(appBody, headerNav, regionContainer);
    console.log(cardContainer);

    themeText === "Dark mode"
      ? setThemeText("Light mode")
      : setThemeText("Dark mode");

    themeText === "Dark mode" ? setThemeImg(sun) : setThemeImg(moon);
  };

  //SEARCHING FOR A COUNTRY
  const searchCountry = (e) => {
    e.preventDefault();

    console.log(countryName);
    setLink(`https://restcountries.com/v3.1/name/${countryName}`);
    setCountryName("");
  };

  //OPENING COUNTRY DETAILS
  const handleCountryDetails = (e) => {
    e.preventDefault();

    const container = e.target.closest(".cardContainer ");
    const containerValue = container.getAttribute("value");

    console.log(containerValue);
    setCountryName(containerValue);
    //console.log(countryDetails);
  };

  if (isLoading) {
    return (
      <div className="h-screen">
        <header>
          <h1 className="headerTitle">Where in the world?</h1>

          <div className="themeGrp">
            <img src={moon} alt="moon" className="themeImg" />
            <p className="themeText">{themeText}</p>
          </div>
        </header>

        <h1 className="loadingMessage"> LOADING....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen">
        <header>
          <h1 className="headerTitle">Where in the world?</h1>

          <div className="themeGrp">
            <img src={moon} alt="moon" className="themeImg" />
            <p className="themeText">{themeText}</p>
          </div>
        </header>

        <h1 className="errorMessage">ERROR : {error.message}</h1>
      </div>
    );
  }

  return (
    <Router>
      <div className="app appLight" ref={appBodyRef}>
        <header className="headerLight" ref={headerRef}>
          <h1 className="headerTitle">Where in the world?</h1>

          <div className="themeGrp" onClick={handleTheme}>
            <img src={themeImg} alt="moon" className="themeImg" />
            <p className="themeText">{themeText}</p>
          </div>
        </header>

        <Switch>
          <Route exact path="/">
            <div className="appBody">
              <div className="searchSection">
                <form className="w-full lg:w-auto" onSubmit={searchCountry}>
                  <input
                    type="text"
                    placeholder="Search for a country..."
                    className="searchBar"
                    value={countryName}
                    ref={inputRef}
                    onChange={(e) => setCountryName(e.target.value)}
                  />
                </form>

                <select
                  name="Regions"
                  id="Regions"
                  onChange={handleRegion}
                  ref={regionsRef}
                >
                  <option value="all">Filter by region</option>
                  <option value="all">All regions</option>
                  <option value="africa">Africa</option>
                  <option value="america">America</option>
                  <option value="asia">Asia</option>
                  <option value="europe">Europe</option>
                  <option value="oceania">Oceania</option>
                </select>
              </div>

              <div className="cardSection">
                <div className="resultNumber">
                  {data && data.length} result(s) found
                </div>

                <div className="cardGrp">
                  {data &&
                    data.map((item, index) => (
                      <div
                        ref={cardContainerRef}
                        className="cardContainer cardContainerLight"
                        key={index}
                        value={item.name.common}
                        onClick={handleCountryDetails}
                      >
                        <img
                          src={item.flags.png}
                          alt={item.name.common}
                          className="countryFlag"
                        />

                        <div className="countryDetails ">
                          <Link to="/CountryDetails" key={index}>
                            <h1 className="countryName">{item.name.common}</h1>
                          </Link>

                          <div className="countryStat">
                            <p className="statHeading">population:</p>
                            <p className="statDetail">{item.population}</p>
                          </div>

                          <div className="countryStat">
                            <p className="statHeading">region:</p>
                            <p className="statDetail">{item.region}</p>
                          </div>

                          <div className="countryStat">
                            <p className="statHeading">capital:</p>
                            <p className="statDetail">{item.capital}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Route>

          <Route path="/CountryDetails">
            <CountryDetails
              data={data}
              countryToDisplay={countryDetails}
            ></CountryDetails>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

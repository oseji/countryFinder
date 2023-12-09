import { useState } from "react";
import { Link } from "react-router-dom";

const CountryDetailsPage = ({ apiData, themeToggled, fetchData }) => {
  console.log(fetchData);

  // let borderName =''
  let apiLink = "";

  return (
    <div
      className={`countryDetailsPage ${
        themeToggled ? "darkMode" : "lightMode"
      }`}
    >
      <Link to="/">
        <button
          className={`prevBtn ${themeToggled ? "bg-slate-700" : "bg-white"}`}
        >
          Back
        </button>
      </Link>

      {apiData === null ||
        (apiData === undefined && (
          <p className="font-bold text-5xl mt-32 text-center">Loading...</p>
        ))}

      {apiData !== null && (
        <div className="countryDetailsGrp">
          <div className="flagContainer">
            <img src={apiData[0].flags.png} alt="flag" className="flagImg" />
          </div>

          <div className="informationContainer">
            <h1 className="infoName">{apiData[0].name.common}</h1>

            <div className="flex flex-row justify-between">
              <div className="infoCol">
                <div className="infoRow">
                  <p className="statHeading">Native name:</p>
                  <p className="statDetail">{apiData[0].name.common}</p>
                </div>
                <div className="infoRow">
                  <p className="statHeading">Population:</p>
                  <p className="statDetail">{apiData[0].population}</p>
                </div>
                <div className="infoRow">
                  <p className="statHeading">Region:</p>
                  <p className="statDetail">{apiData[0].region}</p>
                </div>
                <div className="infoRow">
                  <p className="statHeading">Sub region:</p>
                  <p className="statDetail">{apiData[0].subregion}</p>
                </div>
                <div className="infoRow">
                  <p className="statHeading">Capital:</p>
                  <p className="statDetail">{apiData[0].capital[0]}</p>
                </div>

                <div className="infoRow mt-10">
                  <p className="infoHeading">Borders:</p>
                  <div className="info grid grid-cols-5 gap-2 overflow-hidden ">
                    {apiData[0].borders &&
                      apiData[0]?.borders.map((i, index) => (
                        <span
                          className="rounded-lg border border-slate-700 px-4 py-2 text-center text-xs "
                          key={index}
                          // onClick={() => {
                          //   apiLink = `https://restcountries.com/v3.1/name/${i}`;
                          //   fetchData();
                          // }}
                        >
                          {i}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetailsPage;

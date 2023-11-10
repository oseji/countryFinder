import { Link } from "react-router-dom";

const CountryDetails = (data, countryToDisplay) => {
  console.log(countryToDisplay);

  return (
    <div className="countryDetailsPage">
      <Link to="/">
        <button className="prevBtn">Back</button>
      </Link>

      <div className="countryDetailsGrp">
        <div className="flagContainer">
          <img src={data.data[0].flags.png} alt="flag" className="flagImg" />
        </div>

        {/* <div className="informationContainer">
          <h1 className="infoName">{data.data.name.common}</h1>

          <div className="flex flex-row justify-between">
            <div className="infoCol">
              <div className="infoRow">
                <p className="infoHeading">Native name:</p>
                <p className="info">{data.data.name.common}</p>
              </div>
              <div className="infoRow">
                <p className="infoHeading">Population:</p>
                <p className="info">{data.data.population}</p>
              </div>
              <div className="infoRow">
                <p className="infoHeading">Region:</p>
                <p className="info">{data.data.region}</p>
              </div>
              <div className="infoRow">
                <p className="infoHeading">Sub region:</p>
                <p className="info">{data.data.subregion}</p>
              </div>
              <div className="infoRow">
                <p className="infoHeading">Capital:</p>
                <p className="info">{data.data.capital[0]}</p>
              </div>
            </div>

            <div className="infoCol">
              <div className="infoRow">
                <p className="infoHeading">Top leevel domain:</p>
                <p className="info">Belgie</p>
              </div>
              <div className="infoRow">
                <p className="infoHeading">Currencies:</p>
                <p className="info">Belgie</p>
              </div>
              <div className="infoRow">
                <p className="infoHeading">Languages:</p>
                <p className="info">Belgie</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CountryDetails;

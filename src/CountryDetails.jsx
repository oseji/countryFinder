import { Link } from "react-router-dom";

const CountryDetails = () => {
  return (
    <div className="countryDetailsPage">
      <Link to="/">
        <button className="prevBtn">Back</button>
      </Link>

      <div className="countryDetails">
        <div className="flagContainer">
          <img src="" alt="flag" className="flagImg" />
        </div>

        <div className="informationContainer">
          <h1 className="infoName">Nigeria</h1>

          <div className="flex flex-row justify-between">
            <div className="infoCol">
              <div className="infoRow">
                <p className="infoHeading">Native name:</p>
                <p className="info">Belgie</p>
              </div>
              <div className="infoRow">
                <p className="infoHeading">Population:</p>
                <p className="info">Belgie</p>
              </div>
              <div className="infoRow">
                <p className="infoHeading">Region:</p>
                <p className="info">Belgie</p>
              </div>
              <div className="infoRow">
                <p className="infoHeading">Sub region:</p>
                <p className="info">Belgie</p>
              </div>
              <div className="infoRow">
                <p className="infoHeading">Capital:</p>
                <p className="info">Belgie</p>
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
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;

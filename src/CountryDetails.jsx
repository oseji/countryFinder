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

        <div className="informationContainer">
          <h1 className="infoName">{data.data[0].name.common}</h1>

          <div className="flex flex-row justify-between">
            <div className="infoCol">
              <div className="infoRow">
                <p className="infoHeading">Native name:</p>
                <p className="info">{data.data[0].name.common}</p>
              </div>
              <div className="infoRow">
                <p className="infoHeading">Population:</p>
                <p className="info">{data.data[0].population}</p>
              </div>
              <div className="infoRow">
                <p className="infoHeading">Region:</p>
                <p className="info">{data.data[0].region}</p>
              </div>
              <div className="infoRow">
                <p className="infoHeading">Sub region:</p>
                <p className="info">{data.data[0].subregion}</p>
              </div>
              <div className="infoRow">
                <p className="infoHeading">Capital:</p>
                <p className="info">{data.data[0].capital[0]}</p>
              </div>

              <div className="infoRow mt-10">
                <p className="infoHeading">Borders:</p>
                <div className="info grid grid-cols-5 gap-2 overflow-hidden ">
                  {data.data[0].borders.map((i, index) => (
                    <span
                      className="rounded-lg border border-slate-700 px-4 py-2 text-center text-xs "
                      key={index}
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
    </div>
  );
};

export default CountryDetails;

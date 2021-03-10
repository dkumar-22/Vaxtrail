import React, { useState, useEffect } from "react";
import axios from "axios";
import OdometerStats from "./OdometerStats";
import Vaccines from "./Vaccines";
function Stats() {
  const [stats, setStats] = useState({
    active: 0,
    recovered: 0,
    new: 0,
    deaths: 0,
    total: 0,
  });
  useEffect(() => {
    var options = {
      method: "GET",
      url:
        "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true",
    };
    axios
      .request(options)
      .then(function (response) {
        setStats({
          active: response.data.activeCases,
          recovered: response.data.recovered,
          new: response.data.activeCasesNew,
          deaths: response.data.deaths,
          total: response.data.totalCases,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <div className="stats">
      <div className="stats-left">
        <h2 className="stats-heading">COVID-19 STATS FOR INDIA</h2>
        <div className="stats-1">
          <OdometerStats stat={stats.recovered} heading="RECOVERED" />
          <OdometerStats stat={stats.deaths} heading="DEATHS" />
          <OdometerStats stat={stats.active} heading="ACTIVE" />
        </div>
        <div className="stats-2">
          <OdometerStats stat={stats.total} heading="TOTAL" />
          <OdometerStats stat={stats.new} heading="TODAY" />
          <OdometerStats stat={20922344} heading="TREATED" />
        </div>
      </div>
      <div className="stats-right">
        <h2 className="stats-heading">SOME TOP VACCINES</h2>
        <div className="vacbars">
          <Vaccines value={81} name="Covaxin" />
          <Vaccines value={62} name="Covishield"/>
          <Vaccines value={95} name="Pfizer"/>
          <Vaccines value={90} name="Astrazeneca"/>
        </div>
      </div>
    </div>
  );
}

export default Stats;

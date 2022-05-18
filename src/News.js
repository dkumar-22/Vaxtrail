import React, { useState, useEffect } from "react";
import axios from "axios";
import Articles from "./Articles";
var i = 0;
function News() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    async function getNews() {
      await axios
        .get(
          "https://newsapi.org/v2/everything?apiKey=f6f396807a8248ed98cec28d06fe6bd7&q=coronavirus&language=en&pageSize=20"
        )
        .then(function (response) {
          // handle success
          setNews(response.data.articles);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
    getNews();
  }, []);
  // console.log(news);
  return (
    <div className="news-clm">
      <h1 className="stats-heading">LATEST COVID-19 NEWS</h1>
      <div className="news">
        {news.map((x) => {
          return (
            <Articles
              key={i++}
              img={x.urlToImage}
              url={x.url}
              title={x.title}
              description={x.description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default News;

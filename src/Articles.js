import React from "react";

function Articles({ img, url, title, description }) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <div className="news-articles">
        <img src={img} alt="newsimage" className="news-img" />
        <h4 className="title">{title}</h4>
        <p className="desc">{description}</p>
        <br/>
        <p className="hide">...Click To Read More</p>
      </div>
    </a>
  );
}

export default Articles;

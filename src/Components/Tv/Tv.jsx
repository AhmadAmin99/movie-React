import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Tv() {
  const [tvShowsList, setTvShowsList] = useState([]);

  async function getTvApi() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=340ba3480fbce07a3751043840dd1065"
    );
    // console.log(data.results);
    setTvShowsList(data.results);
  }

  useEffect(() => {
    getTvApi();
  }, []);

  return (
    <>
      <div className="container py-5">
        <div className="row align-items-center py-5 g-3">
          <div className="col-md-4">
            <div className="title">
              <h2>Trending TV Shows To Watch Now</h2>
              <p className="text-muted">Most watched TV Shows by weeks</p>
            </div>
          </div>
          {tvShowsList.map((tvshows, idx) => (
            <div className="col-md-4" key={idx}>
              <Link to={`/details/${tvshows.id}/${tvshows.media_type}`}>
                <div className="tvshows item position-relative">
                  <div className="vote bg-info position-absolute">
                    {tvshows.vote_average}
                  </div>
                  <div className="w-100 ">
                    <img
                      className="w-100"
                      src={`https://image.tmdb.org/t/p/original/${tvshows.poster_path}`}
                      alt="image1"
                    />
                    <h6 className="py-3 text-center">
                      {tvshows.original_name}
                    </h6>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>{" "}
      </div>
    </>
  );
}

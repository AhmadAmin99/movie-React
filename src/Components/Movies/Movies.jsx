import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Movies() {
  const [moviesList, setMoviesList] = useState([]);

  async function getMoviesApi() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=340ba3480fbce07a3751043840dd1065"
    );
    // console.log(data.results);
    setMoviesList(data.results);
  }

  useEffect(() => {
    getMoviesApi();
  }, []);

  return (
    <>
      {moviesList.length === 0 ? (
        <>
          <>
            <div className="vh-100 d-flex justify-content-center align-items-center">
              <i className="fa-solid fa-spinner fa-5x text-white fa-spin"></i>
            </div>
          </>
        </>
      ) : (
        <>
          <div className="container py-5">
            <div className="row align-items-center py-5 g-3">
              <div className="col-md-4">
                <div className="title">
                  <h2>Trending Movies To Watch Now</h2>
                  <p className="text-muted">Most watched movies by weeks</p>
                </div>
              </div>
              {moviesList.map((movie, idx) => (
                <div className="col-md-4" key={idx}>
                  <Link to={`/details/${movie.id}/${movie.media_type}`}>
                    <div className="movie item position-relative">
                      <div className="vote bg-info position-absolute">
                        {movie.vote_average}
                      </div>
                      <img
                        className="w-100"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt="image1"
                      />
                      <h6 className="py-2 text-center">{movie.title}</h6>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

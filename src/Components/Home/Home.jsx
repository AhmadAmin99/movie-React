import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import actor from "../../assets/images/actor.png";
import Detailes from "../Datails/Detailes";

export default function Home() {
  const [moviesList, setMoviesList] = useState([]);
  const [tvShowsList, setTvShowsList] = useState([]);
  const [tvActorsList, setActorsList] = useState([]);

  async function getMoviesApi() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=340ba3480fbce07a3751043840dd1065"
    );
    // console.log(data.results);
    setMoviesList(data.results);
  }

  async function getTvApi() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=340ba3480fbce07a3751043840dd1065"
    );
    // console.log(data.results);
    setTvShowsList(data.results);
  }

  async function getActorsApi() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/person/week?api_key=340ba3480fbce07a3751043840dd1065"
    );
    // console.log(data.results);
    setActorsList(data.results);
  }

  useEffect(() => {
    getMoviesApi();
    getTvApi();
    getActorsApi();
  }, []);

  return (
    <>
      {moviesList.length === 0 &&
      tvShowsList.length === 0 &&
      tvActorsList.length === 0 ? (
        <>
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-spinner fa-5x text-white fa-spin"></i>
          </div>
        </>
      ) : (
        <>
          <div className="container">
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
            </div>

            <div className="row align-items-center  py-5 g-3">
              <div className="col-md-4">
                <div className="title">
                  <h2>Trending Person To Watch Now</h2>
                </div>
              </div>
              {tvActorsList.map((actors, idx) => (
                <div className="col-md-2" key={idx}>
                  <Link to="/details">
                    <div className="actors">
                    
                   
                         <Link to={`/details/${actors.id}/${actors.media_type}`} >
                         <img
                            className="w-100"
                            src={`https://image.tmdb.org/t/p/original/${actors.profile_path? actors.profile_path : actor}`}
                            alt={`${actors.name}`}
                          />
                          <h6 className="pt-2 text-center">{actors.name}</h6>
                         </Link>
          
      
                        
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

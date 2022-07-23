import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import actor from "../../assets/images/actor.png";


export default function Detailes() {
  const { id, cat } = useParams();
  // console.log(id + "   " + cat);
  const [details, setDetails] = useState({});

  async function getDetails() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${cat}/${id}?api_key=340ba3480fbce07a3751043840dd1065&language=en-US`
    );

    setDetails(data);
    // console.log(data.genres);
  }
  useEffect(() => {
    getDetails();
  }, []);

  if (cat === "movie" || cat === "tv") {
    return (
      <>
        <div className="container">
          <div className="row py-5 align-items-center">
            <div className="col-md-4">
              <div className="myImg">
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/original/${details.poster_path}`}
                  alt="image1"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="caption">
                <h2>{details.title ? details.title : details.name}</h2>
                <p className="py-2">{details.overview}</p>
                <div className="py-3">
                  {details.genres?.map((elem, idx) => (
                    <span
                      key={idx}
                      className="bg-info me-2 p-2 rounded-pill text-dark"
                    >
                      {elem.name}
                    </span>
                  ))}
                </div>
                <a
                  className="py-3 text-info"
                  target="blank"
                  href={details.homepage}
                >
                  Visit Home Page
                </a>
                <h5 className="py-3">Release Date : {details.release_date}</h5>
                <span className="fw-bold">Vote :</span>{" "}
                <span className="bg-info px-3 py-2 rounded-3">
                  {details.vote_average}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="row py-3 align-items-center">
            <div className="col-md-4">
              <div className="myImg">
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/original/${details.profile_path? details.profile_path: actor}`}
                  alt="image1"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="caption">
                <h2>{details.name}</h2>
                <p>{details.biography}</p>
                <p>Birthday : {details.birthday}</p>
                <a href={details.homepage} target="blank" className="text-info">
                  Home Page
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

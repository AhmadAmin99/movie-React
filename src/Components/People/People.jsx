import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import actor from "../../assets/images/actor.png";

export default function People() {
  const [tvActorsList, setActorsList] = useState([]);

  async function getActorsApi() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/person/week?api_key=340ba3480fbce07a3751043840dd1065"
    );
    // console.log(data.results);
    setActorsList(data.results);
  }

  useEffect(() => {
    getActorsApi();
  }, []);

  return (<>
      {tvActorsList.length === 0 ? (
        <>
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-spinner fa-5x text-white fa-spin"></i>
          </div>
        </>
      ) :  <>
      <div className="container">
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
                  <Link to={`/details/${actors.id}/${actors.media_type}`}>
                    <img
                      className="w-100"
                      src={`https://image.tmdb.org/t/p/original/${
                        actors.profile_path ? actors.profile_path : actor
                      }`}
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
    }


    </>
  );
}

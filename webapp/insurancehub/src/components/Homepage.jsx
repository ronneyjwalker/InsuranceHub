import React from "react";
import caricon from "../images/homepage/car.jpg";
import lifeicon from "../images/homepage/life.jpg";
import homeicon from "../images/homepage/home.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";

function Homepage() {
  return (
    <>
      {/* <Header /> */}

      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-lg-6">
                <div className="card mb-4">
                  <NavLink to="/auto">
                    <img
                      style={{ opacity: 0.8 }}
                      className="card-img-top"
                      src={caricon}
                      alt="..."
                    />
                  </NavLink>
                  <div className="card-body">
                    <h2 className="card-title h4">Automobile insurance</h2>
                    <p className="card-text">
                      Get started today by selecting your vehicle type and
                      receive your fast, free, and transparent rate quotes.
                    </p>
                    <NavLink className="btn btn-outline-info" to="/auto">
                      Get Started →
                    </NavLink>
                  </div>
                </div>

                <div className="card mb-4">
                  <NavLink to="/home">
                    <img
                      style={{ opacity: 0.8 }}
                      className="card-img-top"
                      src={homeicon}
                      alt="..."
                    />
                  </NavLink>
                  <div className="card-body">
                    <h2 className="card-title h4">Home insurance</h2>
                    <p className="card-text">
                      Get a homeowners insurance quote online today and see how
                      easily you can obtain customized coverage from us.
                    </p>
                    <NavLink className="btn btn-outline-info" to="/home">
                      Get Started →
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card mb-4">
                  <NavLink to="/life">
                    <img
                      style={{ opacity: 0.8 }}
                      className="card-img-top"
                      src={lifeicon}
                      alt="..."
                    />
                  </NavLink>
                  <div className="card-body">
                    <h2 className="card-title h4">Life insurance</h2>
                    <p className="card-text">
                      Get started on your life insurance journey today with life
                      insurance quotes from us.
                    </p>
                    <NavLink className="btn btn-outline-info" to="/life">
                      Get Started →
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {/* <div className="card mb-4">
                        <div className="card-header">Categories</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <ul className="list-unstyled mb-0">
                                        <li><a href="#!">Automobile insurance</a></li>
                                        <li><a href="#!">Home insurance</a></li>
                                    </ul>
                                </div>
                                <div className="col-sm-6">
                                    <ul className="list-unstyled mb-0">
                                        <li><a href="#!">Life insurance</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> */}

            {/* <div className="card mb-4">
                        <div className="card-header">Search Website</div>
                        <div className="card-body">
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                                <button className="btn btn-outline-info" id="button-search" type="button">Go!</button>
                            </div>
                        </div>
                    </div> */}

            <div className="card mb-4">
              <div className="card-header">
                Insurance Services Hub is here for you
              </div>
              <div className="card-body">
                <div className="row p-2">
                  Our ultimate goal is customer satisfaction, which is why we've
                  made it our driving mission to be accessible. We are where you
                  want us to be. So go ahead, connect with us today.
                </div>
                <hr></hr>
                <div className="row">
                  <ul className="list-unstyled mb-0 mt-2">
                    <li>
                      <FontAwesomeIcon icon={faCalendar} />
                      &nbsp;Available Monday through Friday
                    </li>
                    <li className="mt-1">
                      <FontAwesomeIcon icon={faClock} />
                      &nbsp;9am to 6pm CT
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <div className="card mb-4">
                        <div className="card-header">Side Widget</div>
                        <div className="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
                    </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;

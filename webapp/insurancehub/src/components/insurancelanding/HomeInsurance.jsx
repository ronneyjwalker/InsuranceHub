import React, { useState } from "react";
import homeownerimg from "../../images/home/home.jpg";
import renterimg from "../../images/home/renter.jpg";
import floodimg from "../../images/home/flood.jpg";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";

function HomeInsurance() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  scrollToTop();

  return (
    <div style={{ height: "90vh" }} className="container">
      <div className="pt-5">
        <div className="row">
          <div className="col-6 slide-from-left d-flex align-items-center">
            <div className="text-center">
              <div className="row">
                <h2>Homeowners Insurance</h2>
              </div>
              <div className="row mt-4">
                <p>
                  You can also save by improving your home security, by making
                  your home more resistant to disasters, and even by maintaining
                  a good credit rating. When you choose to work with us at
                  InsuranceHub, it's always possible to save on your homeowner's
                  insurance.
                </p>
              </div>
              <div className="mt-5">
                <Link to="/home/quote" className="btn btn-info">
                  <span>
                    Get Homeowners Insurance Quotes&nbsp;
                    <RightOutlined style={{ verticalAlign: "middle" }} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6 slide-from-right d-flex align-items-center justify-content-around">
            <div className="text-center">
              <img className="img" src={homeownerimg} alt="Home image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeInsurance;

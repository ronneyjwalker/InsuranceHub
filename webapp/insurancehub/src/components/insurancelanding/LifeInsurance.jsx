import React from "react";
import lifeimg from "../../images/life/life.jpg";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function LifeInsurance() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  scrollToTop();

  return (
    <div style={{ height: "90vh" }} className="container">
      <div className="row">
        <div className="col-6 slide-from-left d-flex align-items-center">
          <div className="text-center">
            <div className="row">
              <h2>Life Insurance</h2>
            </div>
            <div className="row mt-3">
              <h6>35 MILLION AMERICAN HOUSEHOLDS ARE WITHOUT LIFE INSURANCE</h6>
            </div>
            <div className="row mt-4">
              <p>
                Are you one of these households? Get started on your life
                insurance journey today with life insurance quotes from our team
                at InsuranceHub.
              </p>
            </div>
            <div className="mt-5">
              <Link to="/life/quote" className="btn btn-info">
                <span>
                  Get Life Insurance Quotes&nbsp;
                  <RightOutlined style={{ verticalAlign: "middle" }} />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-6 slide-from-right d-flex align-items-center justify-content-around mt-5">
          <div className="text-center">
            <img className="img" src={lifeimg} alt="Car image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LifeInsurance;

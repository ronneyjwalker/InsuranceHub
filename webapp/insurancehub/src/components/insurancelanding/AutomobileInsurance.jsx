import React, { useState } from "react";
import autocarimg from "../../images/auto/car.jpg";
import automotorcycleimg from "../../images/auto/motorcycle.jpg";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";

function AutomobileInsurance() {
  const [vehicleType, setVehicleType] = useState("car");

  const handleVehicleClick = (type) => {
    setVehicleType(type);
  };

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
        <div className="col text-center">
          <button
            className={
              vehicleType === "car"
                ? "btn btn-info mx-2 ripple"
                : "btn btn-outline-info mx-2 ripple"
            }
            onClick={() => handleVehicleClick("car")}
          >
            Car
          </button>
          <button
            className={
              vehicleType === "motorcycle"
                ? "btn btn-info mx-2 ripple"
                : "btn btn-outline-info mx-2 ripple"
            }
            onClick={() => handleVehicleClick("motorcycle")}
          >
            Motorcycle
          </button>
        </div>
      </div>
      {vehicleType === "car" && (
        <div className="pt-5">
          <div className="row">
            <div className="col-6 slide-from-left d-flex align-items-center">
              <div className="text-center">
                <div className="row">
                  <h2>Save on car insurance</h2>
                </div>
                <div className="row mt-4">
                  <p>
                    Are you looking for a cost-effective solution for your car
                    insurance policy? While avoiding auto accidents and
                    maintaining a good driving record will obviously help you
                    save on your car insurance, there are many other ways to
                    save. In addition to providing an affordable car insurance
                    policy, we have a few tips for getting deeper savings on
                    your insurance quotes.
                  </p>
                </div>
                <div className="mt-5">
                  <Link to="/auto/car/quote" className="btn btn-info">
                    <span>
                      Get Car Insurance Quotes&nbsp;
                      <RightOutlined style={{ verticalAlign: "middle" }} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6 slide-from-right d-flex align-items-center justify-content-around">
              <div className="text-center">
                <img className="img" src={autocarimg} alt="Car image" />
              </div>
            </div>
          </div>
        </div>
      )}
      {vehicleType === "motorcycle" && (
        <div className="pt-5">
          <div className="row">
            <div className="col-6 slide-from-left d-flex align-items-center">
              <div className="text-center">
                <div className="row">
                  <h2>Get motorcycle insurance</h2>
                </div>
                <div className="row mt-3">
                  <h6>
                    Protecting your investment with affordable motorcycle,
                    moped, & scooter insurance is an easy decision.
                  </h6>
                </div>
                <div className="row mt-4">
                  <p>
                    Whether you’re a Honda, Harley, Yamaha, or Kawasaki fan, our
                    motorcycle insurance policies offer the proper protection
                    for you and your bike, plus your accessories. Our policies
                    are designed to meet not only the personal needs of most
                    motorcycle owners but their financial needs as well.
                  </p>
                </div>
                <div className="mt-5">
                  <Link to="/auto/motorcycle/quote" className="btn btn-info">
                    <span>
                      Get Motorcycle Insurance Quotes&nbsp;
                      <RightOutlined style={{ verticalAlign: "middle" }} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6 slide-from-right d-flex align-items-center justify-content-around">
              <div className="text-center">
                <img
                  className="img"
                  src={automotorcycleimg}
                  alt="Motorcycle image"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AutomobileInsurance;

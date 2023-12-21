import React from "react";

function Header() {
  return (
    <header>
      <div className="container">
        <div
          className="mt-4 bg-light border-bottom mb-4 bg-image"
          style={{ height: "450px" }}
        ></div>
        <div className="text-center bg-text">
          <h1 className="fw-bolder">Welcome to Insurance Services!</h1>
          <p className="lead mb-0">
            Your one stop solution for all types of insurances.
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;

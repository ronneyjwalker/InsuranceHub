import React from "react";

function PageNotFound() {
  return (
    <div style={{ height: "90vh" }}>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <img
              src="https://i.imgur.com/qIufhof.png"
              style={{ height: "60vh" }}
            />
            <div id="info">
              <h3>This page could not be found</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;

import React from "react";
import AdminSignIn from "./AdminSignIn";


function Admin() {
  return (
    <div className={`container-fluid signin`}>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6 full-height image-pan"></div>

          <div className="col-md-6 full-height data-pan">
            <div className="row">
              <span className="logo col-offset-1"></span>
            </div>
            <div className="row data-pan-inner">
              <AdminSignIn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;

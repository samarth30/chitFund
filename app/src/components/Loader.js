import React from "react";

function Loader({ viewfund }) {
  return (
    <div id="preloader-active">
      <div class="preloader d-flex align-items-center justify-content-center">
        <div class="preloader-inner position-relative">
          <div class="preloader-circle"></div>
          <div class="preloader-img pere-text">
            <h2>{viewfund[0]}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;

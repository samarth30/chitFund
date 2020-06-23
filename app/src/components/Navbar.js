import React from "react";
import Identicon from "identicon.js";
import { Link } from "react-router-dom";
import { Fragment, useContext, useEffect } from "react";

const Navbar = ({ account, viewfund }) => {
  return (
    <header>
      <div class="header-area header-transparent">
        <div class="main-header header-sticky">
          <div class="container-fluid">
            <div class="row align-items-center">
              <div class="col-xl-2 col-lg-2">
                <h2>{viewfund[0]}</h2>
              </div>
              <div class="col-xl-10 col-lg-10 col-md-10">
                <div class="menu-main d-flex align-items-center justify-content-end">
                  <div class="main-menu f-right d-none d-lg-block">
                    <nav>
                      <ul id="navigation">
                        <Fragment>
                          <li class="active">
                            <Link to="/">Home</Link>
                          </li>
                          <li>
                            <Link to="/about">About</Link>
                          </li>
                        </Fragment>
                        <li>
                          <a href="services.html">Services</a>
                        </li>
                        <li>
                          <a href="blog.html">Blog</a>
                          <ul class="submenu">
                            <li>
                              <a href="blog.html">Blog</a>
                            </li>
                            <li>
                              <a href="blog_details.html">Blog Details</a>
                            </li>
                            <li>
                              <a href="elements.html">Element</a>
                            </li>
                            <li>
                              <a href="apply.html">Apply Now</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="contact.html">Contact</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div class="header-right-btn f-right d-none d-lg-block mb-3">
                    <small id="account">{account}</small>{" "}
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    // <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    //   <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
    //     Chit Fund
    //   </a>

    //   <ul className="navbar-nav px-3">
    //     <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
    //       <small className="text-white">
    //         <small id="account">{account}</small>
    //       </small>

    //       {account ? (
    //         <img
    //           className="ml-2"
    //           width="30"
    //           height="30"
    //           src={`data:image/png;base64,${new Identicon(
    //             account,
    //             30
    //           ).toString()}`}
    //         />
    //       ) : (
    //         <span></span>
    //       )}
    //     </li>
    //   </ul>
    // </nav>
  );
};

export default Navbar;

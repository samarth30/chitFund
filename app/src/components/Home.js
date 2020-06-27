import React, { useState, useEffect } from "react";
import Web3 from "web3";

const Home = ({
  viewfund,
  joinFund,
  contribute,
  getWinner,
  releaseFund,
  bidForJackpot,
  jackpot,
  NoOfInstallments,
  FundBalance,
  factories,
  // loadBlockchainData,
  // loadWeb3,
}) => {
  // useEffect(() => {
  //   loadWeb3();
  //   loadBlockchainData();
  // }, []);

  const [bidding, SetBidding] = useState("");
  const onChange = (e) => {
    SetBidding(e.target.value);
  };

  const onsubmit = (e) => {
    e.preventDefault();
    bidForJackpot(window.web3.utils.toWei(bidding.toString(), "Ether"));
  };

  return (
    <div>
      <main>
        <div
          class="slider-area slider-height"
          data-background="assets/img/hero/h1_hero.jpg"
        >
          <div class="slider-active">
            <div class="single-slider">
              <div class="slider-cap-wrapper">
                <div class="hero__caption">
                  <p data-animation="fadeInLeft" data-delay=".2s">
                    Achieve your financial goal
                  </p>
                  <h1 data-animation="fadeInLeft" data-delay=".5s">
                    Small Business Loans For Daily Expenses.
                  </h1>
                  <p data-animation="fadeInLeft" data-delay=".2s">
                    <div class="flex border-t border-gray-300 py-2 ml-10">
                      <span class="text-gray-900">Chit Fund Name</span>
                      <span class="ml-auto text-gray-900">{viewfund[0]}</span>
                    </div>
                    <div class="flex border-t border-gray-300 py-2 ml-10">
                      <span class="text-gray-900">jackpot</span>
                      <span class="ml-auto text-gray-900">{jackpot} ether</span>
                    </div>
                    <div class="flex border-t border-gray-300 py-2 ml-10">
                      <span class="text-gray-900"> No of Investors </span>
                      <span class="ml-auto text-gray-900">
                        {viewfund[3]} count
                      </span>
                    </div>
                    <div class="flex border-t border-gray-300 py-2 ml-10">
                      <span class="text-gray-900">No of Installments </span>
                      <span class="ml-auto text-gray-900">
                        {viewfund[2]} count
                      </span>
                    </div>
                    <div class="flex border-t border-gray-300 py-2 ml-10">
                      <span class="text-gray-900"> No of Investors Joined</span>
                      <span class="ml-auto text-gray-900">
                        {viewfund[6]} count
                      </span>
                    </div>
                    <div class="flex border-t border-gray-300 py-2 ml-10">
                      <span class="text-gray-900"> Installment Amount </span>
                      <span class="ml-auto text-gray-900">
                        {NoOfInstallments} ether
                      </span>
                    </div>
                    <div class="flex border-t border-gray-300 py-2 ml-10">
                      <span class="text-gray-900">Fund Balance </span>
                      <span class="ml-auto text-gray-900">
                        {FundBalance} ether
                      </span>
                    </div>
                    {/* <span
                      style={{
                        color: "#000000",
                      }}
                      class="fontfirst"
                    >
                      jackpot : {jackpot} ether
                    </span>{" "}
                    <span
                      style={{
                        color: "#000000",
                      }}
                      class="fontfirst"
                    >
                      No of Installments :{viewfund[2]}
                    </span>
                    <span
                      style={{
                        color: "#000000",
                      }}
                      class="fontfirst"
                    >
                      No of Investors :{viewfund[3]}
                    </span>
                    <span
                      style={{
                        color: "#000000",
                      }}
                      class="fontfirst"
                    >
                      No of Investors Joined :{viewfund[6]}
                    </span>
                    <span
                      style={{
                        color: "#000000",
                      }}
                      class="fontfirst"
                    >
                      Installment Amount :{NoOfInstallments} ether
                    </span>
                    <span
                      style={{
                        color: "#000000",
                      }}
                      class="fontfirst"
                    >
                      Fund Balance :{FundBalance} ether
                    </span> */}
                  </p>
                </div>
                <div class="hero__img">
                  <img src="assets/img/hero/hero_img.jpg" alt="" />
                </div>
              </div>
            </div>

            {/* <ul>
              <li>hello</li>
              {console.log(factories)}
              {factories.forEach((factory) => (
                <li key={factory.count}>{factory.manager}</li>
              ))}
            </ul> */}

            {/* <div class="single-slider">
                      <div class="slider-cap-wrapper">
                        <div class="hero__caption">
                          <h1 data-animation="fadeInLeft" data-delay=".5s">
                            Small Business Loans For Daily Expenses.
                          </h1>
                        </div>
                        <div class="hero__img">
                          <img src="assets/img/hero/hero_img2.jpg" alt="" />
                        </div>
                      </div>
                    </div> */}
          </div>
          {/* 
                  <div class="slider-footer section-bg d-none d-sm-block">
                    <div class="footer-wrapper">
                      <div class="single-caption">
                        <div class="single-img">
                          <img src="assets/img/hero/hero_footer.png" alt="" />
                        </div>
                      </div>

                      <div class="single-caption">
                        <div class="caption-icon">
                          <span class="flaticon-clock"></span>
                        </div>
                        <div class="caption">
                          <p>Quick & Easy Loan</p>
                          <p>Approvals</p>
                        </div>
                      </div>
                      <div class="single-caption">
                        <div class="caption-icon">
                          <span class="flaticon-like"></span>
                        </div>
                        <div class="caption">
                          <p>Quick & Easy Loan</p>
                          <p>Approvals</p>
                        </div>
                      </div>
                      <div class="single-caption">
                        <div class="caption-icon">
                          <span class="flaticon-money"></span>
                        </div>
                        <div class="caption">
                          <p>Quick & Easy Loan</p>
                          <p>Approvals</p>
                        </div>
                      </div>
                    </div>
                  </div> */}
        </div>
        {/* 
                <div class="about-low-area section-padding2">
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-6 col-md-12">
                        <div class="about-caption mb-50">
                          <div class="section-tittle mb-35">
                            <span>About Our Company</span>
                            <h2>Detials of our funders of the comapany</h2>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, oeiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut eniminixm, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip
                            exeaoauat. Duis aute irure dolor in reprehe.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, oeiusmod tempor incididunt ut labore et dolore
                            magna aliq.
                          </p>
                          <a href="apply.html" class="btn">
                            Apply for Loan
                          </a>
                        </div>
                      </div>
                      <div class="col-lg-6 col-md-12">
                        <div class="about-img">
                          <div class="about-font-img d-none d-lg-block">
                            <img src="assets/img/gallery/about2.png" alt="" />
                          </div>
                          <div class="about-back-img">
                            <img src="assets/img/gallery/about1.png" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

        <div class="container pt-50">
          <form onSubmit={onsubmit}>
            <div className="form-group">
              <input
                id="bidding"
                type="text"
                className="form-control"
                placeholder="bidding price"
                name="bidding"
                value={bidding}
                onChange={onChange}
                required
              />
            </div>
            <div style={{ position: "absolute", left: "43%" }}>
              <button type="submit" className="btn btn-primary">
                Bid For Jackpot
              </button>
            </div>
          </form>
        </div>

        <div
          class="services-area pt-50 pb-50"
          data-background="assets/img/gallery/section_bg02.jpg"
        >
          <div class="container">
            {/* <div class="row justify-content-center">
                      <div class="col-lg-6 col-md-10">
                        <div class="section-tittle text-center mb-80">
                          <span>Services that we are providing</span>
                          <h2>High Performance Services For All Industries.</h2>
                        </div>
                      </div>
                    </div> */}
            <div class="row">
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="single-cat text-center">
                  <div class="cat-icon">
                    <span class="flaticon-work"></span>
                  </div>
                  <div class="cat-cap">
                    <h5>JOIN FUND</h5>
                    <p>
                      <button onClick={joinFund} className="btn btn-primary">
                        join fund
                      </button>
                    </p>
                    <span class="text-gray-900">
                      {" "}
                      No of Investors Joined : {viewfund[6]}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="single-cat text-center mb-50">
                  <div class="cat-icon">
                    <span class="flaticon-loan"></span>
                  </div>
                  <div class="cat-cap">
                    <h5>CONTRIBUTE</h5>
                    <p>
                      <button onClick={contribute} className="btn btn-primary">
                        contribute
                      </button>
                    </p>
                    <span class="text-gray-900">
                      {" "}
                      contribute : {NoOfInstallments}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="single-cat text-center mb-50">
                  <div class="cat-icon">
                    <span class="flaticon-loan-1"></span>
                  </div>
                  <div class="cat-cap">
                    <h5>GET WINNER</h5>
                    <p>
                      <button onClick={getWinner} className="btn btn-primary">
                        getWinner
                      </button>
                    </p>
                    <span class="text-gray-900">click to choose winner</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="single-cat text-center mb-50">
                  <div class="cat-icon">
                    <span class="flaticon-like"></span>
                  </div>
                  <div class="cat-cap">
                    <h5>RELEASE FUND</h5>
                    <p>
                      {/* only manager can realase the fund */}
                      <button onClick={releaseFund} className="btn btn-primary">
                        release fund
                      </button>
                    </p>
                    <span class="text-gray-900"> Only Manager can do this</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div class="support-company-area section-padding3 fix">
                  <div class="container">
                    <div class="row align-items-center">
                      <div class="col-xl-6 col-lg-6">
                        <div class="support-location-img mb-50">
                          <img src="assets/img/gallery/single2.jpg" alt="" />
                          <div class="support-img-cap">
                            <span>Since 1992</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6">
                        <div class="right-caption">
                          <div class="section-tittle">
                            <span>Why Choose Our Company</span>
                            <h2>We Promise Sustainable Future For You.</h2>
                          </div>
                          <div class="support-caption">
                            <form onSubmit={onsubmit}>
                              <div className="form-group">
                                <input
                                  id="bidding"
                                  type="text"
                                  className="form-control"
                                  placeholder="bidding price"
                                  name="bidding"
                                  value={bidding}
                                  onChange={onChange}
                                  required
                                />
                              </div>
                              <button type="submit" className="btn btn-primary">
                                Bid For Jackpot
                              </button>
                            </form>

                            <div class="select-suport-items pt-2">
                              <label class="single-items">
                                Aorem ipsum dgolor sitnfd amet dfgbn fbsdg
                                <input
                                  type="checkbox"
                                  checked="checked active"
                                />
                                <span class="checkmark"></span>
                              </label>
                              <label class="single-items">
                                Consectetur adipisicing bfnelit, sedb dvbnfo
                                <input
                                  type="checkbox"
                                  checked="checked active"
                                />
                                <span class="checkmark"></span>
                              </label>
                              <label class="single-items">
                                Eiusmod tempor incididunt vmgldupout labore
                                <input
                                  type="checkbox"
                                  checked="checked active"
                                />
                                <span class="checkmark"></span>
                              </label>
                              <label class="single-items">
                                Admkde mibvnim veniam, quivds cnostrud.
                                <input
                                  type="checkbox"
                                  checked="checked active"
                                />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
        {/* team  */}
        {/* <div
                  class="application-area pt-150 pb-140"
                  data-background="assets/img/gallery/section_bg03.jpg"
                >
                  <div class="container">
                    <div class="row justify-content-center">
                      <div class="col-lg-6 col-md-10">
                        <div class="section-tittle section-tittle2 text-center mb-45">
                          <span>Apply in Three Easy Steps</span>
                          <h2>
                            Easy Application Process For Any Types of Loan
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div class="row justify-content-center">
                      <div class="col-lg-9 col-xl-8">
                        <form action="#" class="search-box">
                          <div class="select-form">
                            <div class="select-itms">
                              <select name="select" id="select1">
                                <option value="">Select Amount</option>
                                <option value="">$120</option>
                                <option value="">$700</option>
                                <option value="">$750</option>
                                <option value="">$250</option>
                              </select>
                            </div>
                          </div>
                          <div class="select-form">
                            <div class="select-itms">
                              <select name="select" id="select1">
                                <option value="">Duration Month</option>
                                <option value="">7 Days</option>
                                <option value="">10 Days</option>
                                <option value="">14 Days Days</option>
                                <option value="">20 Days</option>
                              </select>
                            </div>
                          </div>
                          <div class="input-form">
                            <input type="text" placeholder="Return Amount" />
                          </div>
                          <div class="search-form">
                            <a href="apply.html">Apply for Loan</a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div> */}

        {/* <div class="team-area section-padding30">
                  <div class="container">
                    <div class="row justify-content-center">
                      <div class="cl-xl-7 col-lg-8 col-md-10">
                        <div class="section-tittle text-center mb-70">
                          <span>Our Loan Section Team Mambers</span>
                          <h2>Take a look to our professional team members.</h2>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="single-team mb-30">
                          <div class="team-img">
                            <img
                              src="assets/img/gallery/home_blog1.png"
                              alt=""
                            />

                            <div class="team-social">
                              <li>
                                <a href="#">
                                  <i class="fab fa-facebook-f"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i class="fab fa-twitter"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i class="fas fa-globe"></i>
                                </a>
                              </li>
                            </div>
                          </div>
                          <div class="team-caption">
                            <h3>
                              <a href="#">Bruce Roberts</a>
                            </h3>
                            <p>Volunteer leader</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="single-team mb-30">
                          <div class="team-img">
                            <img
                              src="assets/img/gallery/home_blog2.png"
                              alt=""
                            />

                            <div class="team-social">
                              <li>
                                <a href="#">
                                  <i class="fab fa-facebook-f"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i class="fab fa-twitter"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i class="fas fa-globe"></i>
                                </a>
                              </li>
                            </div>
                          </div>
                          <div class="team-caption">
                            <h3>
                              <a href="#">Bruce Roberts</a>
                            </h3>
                            <p>Volunteer leader</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="single-team mb-30">
                          <div class="team-img">
                            <img
                              src="assets/img/gallery/home_blog3.png"
                              alt=""
                            />

                            <div class="team-social">
                              <li>
                                <a href="#">
                                  <i class="fab fa-facebook-f"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i class="fab fa-twitter"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i class="fas fa-globe"></i>
                                </a>
                              </li>
                            </div>
                          </div>
                          <div class="team-caption">
                            <h3>
                              <a href="#">Bruce Roberts</a>
                            </h3>
                            <p>Volunteer leader</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="single-team mb-30">
                          <div class="team-img">
                            <img
                              src="assets/img/gallery/home_blog4.png"
                              alt=""
                            />

                            <div class="team-social">
                              <li>
                                <a href="#">
                                  <i class="fab fa-facebook-f"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i class="fab fa-twitter"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i class="fas fa-globe"></i>
                                </a>
                              </li>
                            </div>
                          </div>
                          <div class="team-caption">
                            <h3>
                              <a href="#">Bruce Roberts</a>
                            </h3>
                            <p>Volunteer leader</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
               </div> */}

        {/* 
                <div class="home-blog-area section-padding30">
                  <div class="container">
                    <div class="row justify-content-center">
                      <div class="col-lg-7 col-md-10">
                        <div class="section-tittle text-center mb-70">
                          <span>News form our latest blog</span>
                          <h2>News from around the world selected by us.</h2>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xl-6 col-lg-6 col-md-6">
                        <div class="single-blogs mb-30">
                          <div class="blog-images">
                            <img src="assets/img/gallery/blog1.png" alt="" />
                          </div>
                          <div class="blog-captions">
                            <span>January 28, 2020</span>
                            <h2>
                              <a href="blog_details.html">
                                The advent of pesticides brought in its benefits
                                and pitfalls.
                              </a>
                            </h2>
                            <p>October 6, a2020by Steve</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6">
                        <div class="single-blogs mb-30">
                          <div class="blog-images">
                            <img src="assets/img/gallery/blog2.png" alt="" />
                          </div>
                          <div class="blog-captions">
                            <span>January 28, 2020</span>
                            <h2>
                              <a href="blog_details.html">
                                The advent of pesticides brought in its benefits
                                and pitfalls.
                              </a>
                            </h2>
                            <p>October 6, a2020by Steve</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
      </main>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import Web3 from "web3";

const Home = ({
  viewfund,
  viewinvestor,
  viewIsManager,
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
        </div>

        <div
          class="services-area pt-50 pb-50"
          data-background="assets/img/gallery/section_bg02.jpg"
          >
          <div class="container">
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
                      contribute to round : {NoOfInstallments}
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

        <div
          class="services-area pt-50 pb-50"
          data-background="assets/img/gallery/section_bg02.jpg"
        >
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="single-cat text-center">
                  <div class="cat-icon">
                    <span class="flaticon-work"></span>
                  </div>
                  <div class="cat-cap">
                    <h5>JOINED FUND</h5>
                    <p>

                    </p>
                    <span class="text-gray-900">
                      {" "}
                      Joined : {String(viewinvestor[0])}
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
                    <h5>InstallmentCounter</h5>
                    <p>

                    </p>
                    <span class="text-gray-900">
                      {" "}
                      Installments Made : {viewinvestor[1]}
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
                    <h5>Ready To Invest</h5>
                    <p>

                    </p>
                    <span class="text-gray-900">
                        {" "}
                      Is Ready To Invest : {String(viewinvestor[2])}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="single-cat text-center mb-50">
                  <div class="cat-icon">
                    <span class="flaticon-like"></span>
                  </div>
                  <div class="cat-cap">
                    <h5>Can Bid</h5>
                    <p>

                    </p>
                    <span class="text-gray-900">
                     {" "}
                      Can Bid : {String(viewinvestor[3])}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="single-cat text-center mb-50">
                  <div class="cat-icon">
                    <span class="flaticon-like"></span>
                  </div>
                  <div class="cat-cap">
                    <h5>Has Won A round</h5>
                    <p>

                    </p>
                    <span class="text-gray-900">
                     {" "}
                      Has Won A Round : {String(viewinvestor[4])}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="single-cat text-center mb-50">
                  <div class="cat-icon">
                    <span class="flaticon-like"></span>
                  </div>
                  <div class="cat-cap">
                    <h5>Are Manager</h5>
                    <p>

                    </p>
                    <span class="text-gray-900">
                     {" "}
                      Are You Manager : {String(viewIsManager)}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="single-cat text-center mb-50">
                  <div class="cat-icon">
                    <span class="flaticon-like"></span>
                  </div>
                  <div class="cat-cap">
                    <h5>Lowest Bid</h5>
                    <p>

                    </p>
                    <span class="text-gray-900">
                     {" "}
                      Lowest Bid This Round : {String(viewfund[9])}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="single-cat text-center mb-50">
                  <div class="cat-icon">
                    <span class="flaticon-like"></span>
                  </div>
                  <div class="cat-cap">
                    <h5>Manager</h5>
                    <p>

                    </p>
                    <span class="text-gray-900">
                     {" "}
                      Manager Is : {String(viewfund[8])}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="single-cat text-center mb-50">
                  <div class="cat-icon">
                    <span class="flaticon-like"></span>
                  </div>
                  <div class="cat-cap">
                    <h5>investor</h5>
                    <p>

                    </p>
                    <span class="text-gray-900">
                     {" "}
                      investor : {JSON.stringify(viewinvestor)}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Home;

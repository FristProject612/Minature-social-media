import './css/templatemo-style.css';
import './css/bootstrap.min.css';
import './css/all.min.css';

export default function Home() {
  return(
    <div>
     <div className="d-flex justify-content-end mt-5 mr-5">
        <a href="/signup" className="mr-2">
          <button className='btn btn-outline-primary'>Signup</button>
        </a>
        <a href="/login" className='ml-2'>
          <button className='btn btn-secondary' onClick={() => console.log("Click")}>Login</button>
        </a>
      </div>
      <section id="tmWelcome" className="parallax-window" data-parallax="scroll" data-image-src="img/mini-profile-bg-01.jpg">
        <div className="container-fluid tm-brand-container-outer">
          <div className="row">
            <div className="col-12">
              <div className="ml-auto mr-0 tm-bg-black-transparent text-white tm-brand-container-inner">
                <div className="tm-brand-container text-center">
                  <h1 className="tm-brand-name">PeoplePlus</h1>
                  <p className="tm-brand-description mb-0">Social media platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tm-bg-white-transparent tm-welcome-container">
          <div className="container-fluid">
            <div className="row h-100">
              <div className="col-md-7 tm-welcome-left-col">
                <div className="tm-welcome-left">
                  <h2 className="tm-welcome-title">Welcome to Mini Profile Page</h2>
                  <p className="pb-0">
                    This is Bootstrap v4.3.1 parallax layout for you. Credit goes to <a rel="nofollow" href="https://www.pexels.com">Pexels</a> for 2 background images. In
                    odio sapien, commodo id ullamcorper ac, dignissim at sapien.
                    Nullam leo massa, vaius ac massa et, tincidunt imperdiet
                  turpis. </p>
                </div>
              </div>
              <div className="col-md-5">
                <div className="tm-welcome-right">
                  <i className="fas fa-4x fa-address-card p-3 tm-welcome-icon"></i>
                  <p className="mb-0">
                    Please spread a word about templatemo website. Anyone can download free Bootstrap CSS templates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tmPortfolio">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="tm-portfolio-item">
                <div className="tm-portfolio-name text-white tm-bg-green">
                  Project Manager
                </div>
                <div className="tm-portfolio-description">
                  <h3 className="tm-text-green">
                    New Company
                    <span className="tm-title-small">(2019 January to Present)</span>
                  </h3>
                  <p className="mb-0">
                    Nullam a tellus ultricies, ornare purus vel, porttitor massa.
                    Aliquam facilisis purus ac eros sollicidudin, in mollis neque
                    facilisis. Duis malesuada, mi non elementum malesuada.
                  </p>
                </div>
              </div>

              <div className="tm-portfolio-item">
                <div className="tm-portfolio-name text-white tm-bg-orange">
                  Senior UX Designer
                </div>
                <div className="tm-portfolio-description">
                  <h3 className="tm-text-orange">
                    Studio One
                    <span className="tm-title-small">(2017 April to 2018 Dec)</span>
                  </h3>
                  <p className="mb-0">
                    Phasellus ac nulla egestas, malesuada dolor quis, scelerisque
                    arcu. Morbi aliquam, nunc vel blandit mattis, sapien nisl
                    convallis sem, quis hendrerit nisl tellus in lectus. Proin at
                    nibh bibendum, tincidunt mauris sit amet, porta risus. Integer
                    id malesuada ligula.
                  </p>
                </div>
              </div>

              <div className="tm-portfolio-item">
                <div className="tm-portfolio-name text-white tm-bg-blue">
                  Graphic Designer
                </div>
                <div className="tm-portfolio-description">
                  <h3 className="tm-text-blue">
                    Digital Com
                    <span className="tm-title-small">(2015 Jan to 2016 Dec)</span>
                  </h3>
                  <p className="mb-0">
                    Etiam porta est nisl, consectetur dapibus ante faucibus id.
                    Nunc ullamcorper a quam eget tincidunt. Proin vehicula mauris
                    ipsum, euismod dignissim dolor convallis ac.
                  </p>
                </div>
              </div>

              <div className="tm-portfolio-item">
                <div className="tm-portfolio-name text-white tm-bg-dark-gray">
                  Design School
                </div>
                <div className="tm-portfolio-description">
                  <h3 className="tm-text-dark-gray">
                    Art Design College
                    <span className="tm-title-small">
                      (2012 May to 2014 Dec)
                    </span>
                  </h3>
                  <p className="mb-0">
                    Etiam porta est nisl, consectetur dapibus ante faucibus id.
                    Nunc ullamcorper a quam eget tincidunt. Proin vehicula mauris
                    ipsum, euismod dignissim dolor convallis ac.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
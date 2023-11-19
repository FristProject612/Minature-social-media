import PropTypes from 'prop-types';

export default function Navbar({username}) { 
  return( 
      <nav className="navbar sticky-top bg-light shadow-sm "> 
          <div className="container-fluid"> 
              <a className="navbar-brand" href="/feed"> 
                  <img src="../../../public/vite.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" /> 
                  PeoplePlus
              </a> 
              <p>{username}</p> 
          </div> 
      </nav> 
  ) 
}

Navbar.propTypes = {
  username: PropTypes.string.isRequired,
};

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {connect} from 'react-redux';
import {setCurrentUser, logoutUser} from './actions/authActions';
// import components
import { withRouter } from './components/auth/withRouter';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import global css
import './App.css';
// impor the store
import store from './store.js';
// check for token
if(localStorage.jwtToken) {
  // set the header Authoriztion
  setAuthToken(localStorage.jwtToken);
 // decode token to get the user 
 const decoded = jwt_decode(localStorage.jwtToken);
 // set the user and isAutheticated
 store.dispatch(setCurrentUser(decoded));
 // check for expired token
 const currentTime = Date.now / 1000;
 if(decoded.exp < currentTime) {
  // logout user
  store.dispatch(logoutUser());
  // TODO: clear current profile

  // redirect to login page
  window.location.href = '/login';
 }
}

function App(props) {
  const {isAuthenticated} = props.auth;
  // console.log(isAuthenticated);
  return (
      <div className="App">
      <Router>
          <Navbar/>
          <Routes>
                <Route exact path = '/' element={<Landing/>} />
                <Route exact path = '/login' element={<Login/>} /> 
                <Route exact path = '/register' element={<Register/>}/>
                <Route exact path = '/dashboard' element={<div>From Dashboard</div>}/>
          </Routes>
          <Footer/>
        </Router>
      </div>
 );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {})((App));

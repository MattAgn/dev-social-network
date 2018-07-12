import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Check for token
const jwtToken = localStorage.getItem("jwtToken");
if (jwtToken) {
  setAuthToken(jwtToken);
  const infoDecoded = jwt_decode(jwtToken);
  store.dispatch(setCurrentUser(infoDecoded));

  const currentTime = Date.now() / 1000;
  if (infoDecoded.exp < currentTime) {
    store.dispatch(logoutUser())
    // TODO: Clear current profile
    window.location.href = "/login"
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextFieldGroup from "../common/TextFieldGroup";

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    skills: "",
    githubUsername: "",
    bio: "",
    twitter: "",
    facebook: "",
    youtube: "",
    instagram: "",
    linkedin: "",
    location: "",
    website: "",
    company: "",
    errors: {}
  };

  static propTypes = {
    profile: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-6 text-center">
                Create your profile
                <p className="lead text-center">
                  Let's get some information to make your profile stand out !
                </p>
                <small className="d-block pb-3">* = required field</small>
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);

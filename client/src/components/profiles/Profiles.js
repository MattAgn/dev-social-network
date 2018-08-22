import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CircularProgress from "material-ui/CircularProgress";
import { getProfiles } from "../../actions/profileActions";

import ProfileItem from "./ProfileItem";

export class Profiles extends Component {
  static propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  };

  render() {
    const { profiles, loading } = this.props.profile;

    if (profiles == null || loading) {
      profileItems = (
        <CircularProgress size={50} style={{ flex: "center !important" }} />
      );
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found..........</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developers profile</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);

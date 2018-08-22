import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CircularProgress from "material-ui/CircularProgress";
import { getProfileByHandle } from "../../actions/profileActions";

import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";

export class Profile extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      user: PropTypes.object.isRequired
    }).isRequired,
    getProfileByHandle: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  };

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = (
        <CircularProgress size={50} style={{ flex: "center !important" }} />
      );
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            experience={profile.experience}
            education={profile.education}
          />
          {profile.githubusername && (
            <ProfileGithub githubusername={profile.githubusername} />
          )}
        </div>
      );
    }
    return <div />;
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);

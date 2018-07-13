import React, { Component } from "react";
import PropTypes from "prop-types";
import CircularProgress from "material-ui/CircularProgress";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import { isAbsolute } from "path";

class Dashboard extends Component {
  static propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      user: PropTypes.object.isRequired
    }).isRequired,
    profile: PropTypes.object.isRequired
  };

  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = (
        <CircularProgress size={50} style={{ flex: "center !important" }} />
      );
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>Hey {user.name}</h4>;
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>
              You have not yet set up a profile, please add some info about
              yourself
            </p>
            <Link to="/create-profile" className="btn btn-info btn-md">
              Create profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard" style={{ flex: "auto" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-6">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { addExperience } from "../../actions/profileActions";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";

class AddExperience extends Component {
  static propTypes = {
    prop: PropTypes
  };

  state = {
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false,
    errors: {}
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <Link to="/dashboard" className="" btn btn-light>
              Go back
            </Link>
            <h1 className="display-4 text-center">Add experience</h1>
            <p className="lead text-center">
              Add any job or position you had in the past or current
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="* Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
              />
              <TextFieldGroup
                placeholder="* Job title"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
              />
              <h6>From data</h6>
              <TextFieldGroup
                name="from"
                type="data"
                value={this.state.from}
                onChange={this.onChange}
                error={errors.from}
              />
              <h6>To data</h6>
              <TextFieldGroup
                name="to"
                type="data"
                value={this.state.to}
                onChange={this.onChange}
                error={errors.to}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddExperience));

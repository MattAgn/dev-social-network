import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      user: PropTypes.object.isRequired
    }).isRequired,
    errors: PropTypes.object.isRequired
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push(".dashboard");
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;
    const newUser = { name, email, password, password2 };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  value={this.state.name}
                  error={this.state.errors.name}
                  placeholder="Name"
                  name="name"
                  onChange={this.onChange}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                />
                <TextFieldGroup
                  value={this.state.email}
                  error={this.state.errors.email}
                  placeholder="Email address"
                  name="email"
                  type="email"
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  info="This site uses Gravatar so if you want a profile image, use a gravatar email"
                />
                <TextFieldGroup
                  value={this.state.password}
                  error={this.state.errors.password}
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                />
                <TextFieldGroup
                  value={this.state.password2}
                  error={this.state.errors.password2}
                  placeholder="Confirm password"
                  name="password2"
                  type="password"
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));

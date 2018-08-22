import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class PostItem extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.shape({
      user: PropTypes.object.isRequired
    }).isRequired
  };

  onDeleteClick = e => {
    console.log("delete");
  };

  render() {
    const { post, auth } = this.props;

    return <div />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PostItem);

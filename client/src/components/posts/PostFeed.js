import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

export default class PostFeed extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  };

  render() {
    const { posts } = this.props;

    return posts.map(post => <PostItem post={post} key={post._id} />);
  }
}

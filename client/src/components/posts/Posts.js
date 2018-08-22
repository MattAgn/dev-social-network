import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CircularProgress from "material-ui/CircularProgress";
import { getPosts } from "../../actions/postActions";

import PostForm from "./PostForm";
import PostFeed from "./PostFeed";

export class Posts extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  };

  componentDidMount = () => {
    this.props.getPosts();
  };

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = (
        <CircularProgress size={50} style={{ flex: "center !important" }} />
      );
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  {}
)(Posts);

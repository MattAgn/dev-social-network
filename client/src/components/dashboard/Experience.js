import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  static propTypes = {
    deleteExperience: PropTypes.func.isRequired
  };

  onDeleteClick = id => {
    this.props.deleteExperience(id);
  };

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>{exp.location}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to ? "Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
        </td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience credentials</h4>
        <table className="table">
          <thead>
            <td>Company</td>
            <td>Title</td>
            <td>Location</td>
            <td>Years</td>
            <td />
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteExperience }
)(Experience);

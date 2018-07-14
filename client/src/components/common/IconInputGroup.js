import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const IconInputGroup = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  onSubmit,
  icon
}) => (
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">
        <i className={icon} />
      </span>
    </div>
    <input
      type={type}
      className={classnames("form-control form-control-lg", {
        "is-invalid": error
      })}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      onSubmit={onSubmit}
      value={value}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

IconInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func
};

IconInputGroup.defaultProps = {
  type: "text"
};

export default IconInputGroup;

import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const SelectListGroup = ({
  name,
  value,
  error,
  info,
  options,
  onChange,
  onSubmit
}) => (
  <div className="form-group">
    <select
      className={classnames("form-control form-control-lg", {
        "is-invalid": error
      })}
      name={name}
      onChange={onChange}
      onSubmit={onSubmit}
      value={value}
    >
      {options.map(option => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {info && <small className="form-text text-muted">{info}</small>}
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;

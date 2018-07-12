import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  onSubmit,
  disabled
}) => (
  <div className="form-group">
    <input
      type={type}
      className={classnames("form-control form-control-lg", {
        "is-invalid": error
      })}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      onSubmit={onSubmit}
      disabled={disabled}
      value={value}
    />
    {info && <small className="form-text text-muted">{info}</small>}
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool
};

TextFieldGroup.defaultProps = {
  type: "text",
  disabled: false
};

export default TextFieldGroup;

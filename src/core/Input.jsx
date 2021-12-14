import React from "react";
import styled from "styled-components";
import { theme, borderRadius, paddings } from "../app/contants";
import PropTypes from "prop-types";

const Input = ({ label, type, value, onChange, onClick, primary }) => (
  <Label>
    <Title name="label">{label}</Title>
    <InputField
      name="input"
      primary={primary}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={onClick}
      required
    />
  </Label>
);

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
};

const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${theme.text};
  width: 100%;
  flex-direction: column;
  padding: ${paddings.medium};
`;

const Title = styled.span`
  margin: ${paddings.medium};
`;

const InputField = styled.input`
  padding: ${paddings.medium};
  margin: 0 ${paddings.medium};
  border-radius: ${borderRadius.medium};
  border: 1px solid ${theme.hover};
  background-color: ${(props) => (props.primary ? theme.primary : theme.inner)};
  cursor: ${(props) =>
    props.type === "submit" || props.type === "button" ? "pointer" : "auto"};
`;

export default Input;

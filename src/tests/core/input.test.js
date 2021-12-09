import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Input from "../../core/Input";

describe("Input", () => {
  afterEach(cleanup);
  const setup = (
    type = "",
    label = "",
    value = "",
    onChange = () => {},
    onClick = () => {},
    primary = false
  ) => {
    const utils = render(
      <Input
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        onClick={onClick}
        primary={primary}
      />
    );
    const input = utils.getByRole(type === "text" ? "textbox" : "button");
    return {
      input,
      ...utils,
    };
  };

  test("Should contain label", () => {
    const { getByText } = render(
      <Input type="button" value="test" label="label_test" />
    );
    expect(getByText(/label_test/i)).toBeInTheDocument();
  });
  test("Should contain input text field", () => {
    const { input } = setup("text");
    expect(input).toBeInTheDocument();
  });
  test("Should display value", () => {
    const { input } = setup("text", "", "value_test");
    expect(input.value).toBe("value_test");
  });
  test("Should call onchange event", () => {
    const onChangeEvent = jest.fn();
    const { input } = setup("text", "", "", onChangeEvent);
    fireEvent.change(input, { target: { value: "23" } });
    expect(onChangeEvent).toHaveBeenCalledWith("23");
  });
  test("Should contain input button field", () => {
    const { input } = setup("button");
    expect(input).toBeInTheDocument();
  });
});

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RepositoryForm from "../../../pages/components/RepositoryForm";

const onSearch = jest.fn();

describe("Repository form", () => {
  beforeEach(() => {
    render(
        <RepositoryForm onSearch={onSearch}/>
    );
  });
  test("Should contain 2 textfields", () => {
    expect(screen.getAllByRole("textbox").length).toBe(2)
  });
  test("Should contain button", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("Should call search callback", async () => {
    const input = screen.getAllByRole("textbox");
    const form = screen.getByTestId("form");
    fireEvent.change(input[0], {target: {value: 'owner'}})
    fireEvent.change(input[1], {target: {value: 'repo'}})
    fireEvent.submit(form);
    expect(onSearch).toHaveBeenCalledWith("owner", "repo");
  });
});

import React from "react";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Home from "../../pages/Home";
import axios from "axios";

jest.mock("axios");

describe("Home", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  
  beforeEach(async () => {
    axios.mockResolvedValue({ data: [] });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });
  test("Should contain logo", () => {
    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });
  test("Should contain form", () => {
    expect(screen.getByTestId("form")).toBeInTheDocument();
  });
  test("Should display not found message", async () => {
    const input = screen.getAllByRole("textbox");
    const form = screen.getByTestId("form");
    act(() => {
      fireEvent.change(input[0], { target: { value: "owner" } });
      fireEvent.change(input[1], { target: { value: "repo" } });
      fireEvent.submit(form);
    });
    await waitFor(() => {
      expect(screen.getByAltText("Not found")).toBeInTheDocument();
    });
  });
  test("Should display data table", async () => {
    axios.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "title",
          updated_at: "0",
          state: "OPEN",
          html_url: "url",
        },
      ],
    });

    const input = screen.getAllByRole("textbox");
    const form = screen.getByTestId("form");
    act(() => {
      fireEvent.change(input[0], { target: { value: "owner" } });
      fireEvent.change(input[1], { target: { value: "repo" } });
      fireEvent.submit(form);
    });
    await waitFor(() => {
      expect(screen.getByRole("dataTable")).toBeInTheDocument();
    });
  });
});

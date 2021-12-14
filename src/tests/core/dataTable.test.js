import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "../../core/DataTable";

describe("Data Table", () => {
  const headers = [
    { title: "Title", sort: false },
    { title: "Updated", sort: true },
    { title: "Status", sort: false },
  ];
  const data = [
    {
      id: 1,
      title: "title",
      updated_at: "0",
      state: "OPEN",
      html_url: "url",
    },
  ];

  test("Should display header", () => {
    render(<DataTable headers={headers} data={data} />);
    expect(screen.getAllByRole("header").length).toBe(3);
    headers.forEach((header) => {
      expect(screen.getByText(header.title)).toBeInTheDocument();
    });
  });
  test("Should display loader", () => {
    render(<DataTable loading={true} />);
    expect(screen.getByRole("loader")).toBeInTheDocument();
  });
  test("Should display data", () => {
    render(<DataTable headers={headers} data={data} />);
    expect(screen.getAllByRole("data").length).toBe(1);
    data.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(
        screen.getByText(new Date(item.updated_at).toISOString().slice(0, 10))
      ).toBeInTheDocument();
      expect(screen.getByText(item.state)).toBeInTheDocument();
    });
  });
  test("Should call sort callback", async () => {
    const onSort = jest.fn();
    render(<DataTable headers={headers} data={data} onSort={onSort}/>);
    fireEvent.click(screen.getByText("Updated"));
    expect(onSort).toHaveBeenCalledWith("updated");
  });
  test("Should display pagination forward only", async () => {
    render(<DataTable headers={headers} data={data} />);
    expect(screen.getByRole("pagination")).toBeInTheDocument();
    expect(screen.getByText("→")).toBeInTheDocument();
  });
  test("Should display pagination forward and back", async () => {
    render(<DataTable headers={headers} data={data} page={2}/>);
    expect(screen.getByRole("pagination")).toBeInTheDocument();
    expect(screen.getByText("←")).toBeInTheDocument();
    expect(screen.getByText("→")).toBeInTheDocument();
  });
  test("Should call page change forward callback", async () => {
    const onPageChange = jest.fn();
    render(<DataTable headers={headers} data={data} onPageChange={onPageChange}/>);
    fireEvent.click(screen.getByText("→"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test("Should call page change back callback", async () => {
    const onPageChange = jest.fn();
    render(<DataTable headers={headers} data={data} onPageChange={onPageChange} page={2}/>);
    fireEvent.click(screen.getByText("←"));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});

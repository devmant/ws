import React from "react";
import { render } from "@testing-library/react";
import NotFoundMessage from "../../core/NotFoundMessage";
import notFound from "../../images/notFound.png";

test("Not found message countains image", () => {
  const { getByRole } = render(<NotFoundMessage />);
  const displayedImage = document.querySelector("img");
  expect(displayedImage.src).toContain(notFound);
  expect(getByRole("img")).toBeInTheDocument();
});

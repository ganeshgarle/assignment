import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
jest.mock("./pages", () => ({
  CompareFile: jest.fn(() => <div>Mock CompareFile Component</div>),
}));

describe("App Component", () => {
  test("renders CompareFile component", () => {
    render(<App />);

    expect(screen.getByText("Mock CompareFile Component")).toBeInTheDocument();
  });
});

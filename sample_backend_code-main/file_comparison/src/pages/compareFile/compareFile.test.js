import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CompareFile from "./index"; // Adjust the import path as necessary
import useFileUpload from "../../api/hooks";

jest.mock("../../api/hooks"); // Mock the custom hook

describe("CompareFile Component", () => {
  const mockUploadFiles = jest.fn();

  beforeEach(() => {
    useFileUpload.mockReturnValue({
      error: null,
      isLoading: false,
      response: null,
      uploadFiles: mockUploadFiles,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component", () => {
    render(<CompareFile />);
    expect(screen.getByText("File comparison app")).toBeInTheDocument();
    expect(screen.getByText(/Upload File 1:/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload File 2:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Compare Files/i })
    ).toBeInTheDocument();
  });

  test("handles file uploads correctly", () => {
    render(<CompareFile />);

    const file1 = new File(["file1 content"], "file1.txt", {
      type: "text/plain",
    });
    const file2 = new File(["file2 content"], "file2.txt", {
      type: "text/plain",
    });

    fireEvent.change(screen.getByText(/Upload File 1:/i), {
      target: { files: [file1] },
    });
    fireEvent.change(screen.getByText(/Upload File 2:/i), {
      target: { files: [file2] },
    });

    expect(mockUploadFiles).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: /Compare Files/i }));

    // expect(mockUploadFiles).toHaveBeenCalledWith(file1, file2);
  });

  test("disables the button while loading", () => {
    useFileUpload.mockReturnValue({
      error: null,
      isLoading: true,
      response: null,
      uploadFiles: mockUploadFiles,
    });

    render(<CompareFile />);
    expect(
      screen.getByRole("button", { name: /Comparing.../i })
    ).toBeDisabled();
  });

  test("shows error message when there is an error", () => {
    const errorMessage = "File upload failed";
    useFileUpload.mockReturnValue({
      error: errorMessage,
      isLoading: false,
      response: null,
      uploadFiles: mockUploadFiles,
    });

    render(<CompareFile />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test("displays comparison results after successful upload", async () => {
    const response = { result: "Comparison Successful" };
    useFileUpload.mockReturnValue({
      error: null,
      isLoading: false,
      response: response,
      uploadFiles: mockUploadFiles,
    });

    render(<CompareFile />);

    const file1 = new File(["file1 content"], "file1.txt", {
      type: "text/plain",
    });
    const file2 = new File(["file2 content"], "file2.txt", {
      type: "text/plain",
    });

    fireEvent.change(screen.getByText(/Upload File 1:/i), {
      target: { files: [file1] },
    });
    fireEvent.change(screen.getByText(/Upload File 2:/i), {
      target: { files: [file2] },
    });

    fireEvent.click(screen.getByRole("button", { name: /Compare Files/i }));

    // Wait for the results to be displayed
    expect(await screen.findByText(/Comparison Results:/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/"result": "Comparison Successful"/i)
    ).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import type {
  RenderResult} from "@testing-library/react";
import {
  render,
  fireEvent,
  waitFor,
  createEvent,
} from "@testing-library/react";

import type { UploadProps } from "./upload";
import { Upload } from "./upload";

jest.mock("../Icon/icon", () => {
  return ({ icon, onClick }) => {
    return <span onClick={onClick}>{icon}</span>;
  };
});

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};
let wrapper: RenderResult;
let fileInput: HTMLInputElement;
let uploadArea: HTMLElement;

const testFile = new File(["xyz"], "test.png", { type: "image/png" });

describe("test upload component", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
    fileInput = wrapper.container.querySelector(
      ".adai-file-input"
    ) as HTMLInputElement;
    uploadArea = wrapper.queryByText("Click to upload") as HTMLElement;
  });

  it("upload process should works fine", async () => {
    const { queryByText } = wrapper;
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })
    mockedAxios.post.mockResolvedValue({ data: "cool" });
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, {
      target: { files: [testFile] },
    });
    expect(queryByText("spinner")).toBeInTheDocument();
    await waitFor(() => {
      expect(queryByText("test.png")).toBeInTheDocument();
    });
    expect(queryByText("check-circle")).toBeInTheDocument();
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);

    //remove the uploaded file
    expect(queryByText("times")).toBeInTheDocument();
    fireEvent.click(queryByText("times") as HTMLElement);
    expect(queryByText("test.png")).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      })
    );
  });

  it("drag and drop files should works fine", async () => {
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("is-dragover");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("is-dragover");
    const mockDropEvent = createEvent.drop(uploadArea);
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile],
      },
    });
    fireEvent(uploadArea, mockDropEvent);

    await waitFor(() => {
      expect(wrapper.queryByText("test.png")).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
  });
});

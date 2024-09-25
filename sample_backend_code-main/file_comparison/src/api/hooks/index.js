import { useState } from "react";
import httpService from "..";

const allowedExtensions = [".txt", ".json", ".csv"];

const validateFile = (file) => {
  const extension = file.name.split(".").pop();
  return allowedExtensions.includes(`.${extension}`);
};

const useFileUpload = (url = "") => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const uploadFiles = async (file1, file2) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    // Validate that both files are selected
    if (!file1 || !file2) {
      setError("Both file fields are required.");
      setIsLoading(false);
      return;
    }

    // Validate file extensions
    if (!validateFile(file1) || !validateFile(file2)) {
      setError(`Allowed file extensions are: ${allowedExtensions.join(", ")}`);
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      const response = await httpService(url, "post", formData);
      setResponse(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error: error,
    isLoading: isLoading,
    response: response,
    uploadFiles: uploadFiles,
  };
};

export default useFileUpload;

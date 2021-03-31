import { axios } from "../core/axios";

export const uploadFiles = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await axios.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

import axios from "axios";

export const imageUpload = async (imgFile) => {
  const formData = new FormData();
  formData.append("image", imgFile);

  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const url = `https://api.imgbb.com/1/upload?&key=${imgbbApiKey}`;

  const { data } = await axios.post(url, formData);
  return data?.data?.display_url;
};


// upload image using cloudinary

// export const videoUploadCloudinary = async (videoFile) => {
//   const formData = new FormData();
//   formData.append("file", videoFile);
//   formData.append(
//     "upload_preset",
//     import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
//   );

//   const {data} = await axios.post(`https://api.cloudinary.com/v1_1/${
//     import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
//   }/video/upload`, formData)
//   return data;
// };

// example post endpoint: https://api.cloudinary.com/v1_1/<cloud name>/<resource_type>/upload
// resource_type is the type of file to upload. Valid values: image, raw, video and auto to automatically detect the file type.
// example: https://api.cloudinary.com/v1_1/demo/image/upload



// save or update user info to database
export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    userData
  );

  return data;
};

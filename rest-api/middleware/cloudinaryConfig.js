import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dk0bik4yw",
  api_key: "342653613169365",
  api_secret: "xoZYHxaB5SYHTQOuvK_xar1P29U",
});

exports.uploads = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: "auto" }
    );
  });
};
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// File upload
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log("File uploaded successfully on cloudinary", response.url);
        fs.unlinkSync(localFilePath); // removes the locally saved temp file
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // removes the locally saved temp file
    }
    return null;
};

export { uploadOnCloudinary };

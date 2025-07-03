const cloudinary = require("cloudinary").v2;
const streamifier = require('streamifier');


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("✅ Cloudinary configured successfully!");

// Cloudinary Upload Function
const uploadImage = (buffer, filename) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'products', public_id: filename, resource_type: 'auto' },
            (error, result) => {
                console.log(result.public_id,"publicid")
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

// Get Optimized Image URL
const getOptimizedUrl = (publicId) => {
    return cloudinary.url(publicId, { fetch_format: "auto", quality: "auto" });
};

// Get Auto-Cropped Image URL
const getAutoCropUrl = (publicId, width = 500, height = 500) => {
    return cloudinary.url(publicId, { crop: "auto", gravity: "auto", width, height });
};


// Delete Image Function
const deleteImage = (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                console.error(`Error deleting image ${publicId} from Cloudinary:`, error);
                return reject(error);
            }
            console.log(`Deleted image ${publicId} from Cloudinary:`, result);
            resolve(result);
        });
    });
};


module.exports = { uploadImage, getOptimizedUrl, getAutoCropUrl,deleteImage, cloudinary };
import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECERET_KEY
});

const uploadOnCloudinary = async (localpath)=>{
    try {
        if (!localpath) return null ;
        const response = await cloudinary.uploader.upload(localpath,{
            resource_type : 'auto'
        });
        console.log("file is upload on cloudinary", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localpath)
        return null;
    }

} 

export {uploadOnCloudinary}
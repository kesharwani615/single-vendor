import S3FileUpload from 'react-s3/lib/ReactS3.js';

const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    dirName: process.env.REACT_APP_BUCKET_DIR,
    region: process.env.REACT_APP_BUCKET_REGION,
    accessKeyId: process.env.REACT_APP_BUCKET_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_BUCKET_SECRETACCESSKEY,
};


//  console.log("config:",config);

 window.Buffer = window.Buffer || require("buffer").Buffer;

  export const onImageHandler = async (e) => {
    const file = e.target.files[0];
    console.log("filetype in img", file?.type, file);
    if
        (
            file?.type === "image/jpeg" ||
            file?.type === "image/jpg" ||
            file?.type === "image/png"
    ) {
        if (file.size * 0.000001 <= 5) {
            const data = await S3FileUpload.uploadFile(file, config)
            console.log(data,"internal")
           return [file,data];
        }
        else {
            return "Image should be below 5MB";
        }
    } else {
       return "*Please upload in JPEG,PNG,JPG format Only";

    }
}
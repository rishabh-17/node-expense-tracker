const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: "********************************",
  secretAccessKey: "********************************",
});

const upload = async (data, filename) => {
  const params = {
    Bucket: "rishuexpense",
    Key: filename,
    Body: data,
    ACL: "public-read",
  };
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, response) => {
      if (err) {
        console.log(err);
        reject("Error uploading file to S3");
      }
      console.log(response);
      resolve(response.Location);
    });
  });
};

module.exports = upload;

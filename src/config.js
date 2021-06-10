const config = {
   s3: {
     REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
     BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME",
   },
   apiGateway: {
     REGION: "us-west-2",
     URL: "YOUR_API_GATEWAY_URL",
   },
   cognito: {
     REGION: "us-west-2",
     USER_POOL_ID: "us-west-2_OySBJtmTJ",
     APP_CLIENT_ID: "32m54chn835klp9vrbgg709in4",
     IDENTITY_POOL_ID: "us-west-2:b96b5617-3eec-4312-bef0-0f74e982156a",
   },
 };
 
 export default config;
import { S3Client } from "@aws-sdk/client-s3";

class R2Service {
  static getR2Config() {
    return {
      accessKeyId: process.env.R2_ACCESS_KEY,
      secretAccessKey: process.env.R2_SECRET_KEY,
      endpoint: process.env.R2_ENDPOINT,
      bucket: process.env.R2_BUCKET,
    };
  }

  static getClientConfig() {
    const r2Config = R2Service.getR2Config();

    const r2 = new S3Client({
      region: "auto",
      endpoint: r2Config.endpoint || "",
      credentials: {
        accessKeyId: r2Config.accessKeyId || "",
        secretAccessKey: r2Config.secretAccessKey || "",
      },
    });

    return r2;
  }
}

export default R2Service;

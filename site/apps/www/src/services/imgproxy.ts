import Imgproxy from "imgproxy";

const imgproxy = new Imgproxy({
  baseUrl: process.env.IMGPROXY_ENDPOINT as string,
  key: process.env.IMGPROXY_KEY,
  salt: process.env.IMGPROXY_SALT,
  encode: true
});

export default imgproxy;

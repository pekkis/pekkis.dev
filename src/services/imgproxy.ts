import Imgproxy from "imgproxy";

const imgproxy = new Imgproxy({
  baseUrl: "https://imgproxy.pekkis.eu",
  key: process.env.IMGPROXY_KEY,
  salt: process.env.IMGPROXY_SALT,
  encode: true
});

export default imgproxy;

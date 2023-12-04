export default function handler(req, res) {
  let userIp = "";

  if (req.headers["x-forwarded-for"]) {
    userIp = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.headers["x-real-ip"]) {
    userIp = req.connection.remoteAddress;
  } else {
    userIp = req.connection.remoteAddress;
  }
  res.status(200).json({ userIp: userIp });
}

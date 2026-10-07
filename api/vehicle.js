export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ status: "error", message: "Vehicle number required" });
  }

  try {
    const targetUrl = `https://apihub-livid.vercel.app/api/vehicle?key=naxupdate_49447fc17415907058&veh=${encodeURIComponent(query)}`;
    const response = await fetch(targetUrl);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ status: "error", message: "Aadhaar number required" });
  }

  // NOTE: If you have an authorized Aadhaar endpoint API URL, place it below.
  const AADHAR_API_ENDPOINT = process.env.AADHAR_API_URL || "";

  if (!AADHAR_API_ENDPOINT) {
    return res.status(501).json({ 
      status: "error", 
      message: "Aadhaar API endpoint is not configured on the server." 
    });
  }

  try {
    const targetUrl = `${AADHAR_API_ENDPOINT}?id=${encodeURIComponent(query)}`;
    const response = await fetch(targetUrl);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ status: "error", message: "IFSC code required" });
  }

  try {
    const targetUrl = `https://vercei-kappa.vercel.app/ifsc?code=${encodeURIComponent(query)}`;
    const response = await fetch(targetUrl);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
}

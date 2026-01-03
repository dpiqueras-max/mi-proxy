export default async function handler(req, res) {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Falta ?url=' });
    
    const targetResponse = await fetch(decodeURIComponent(url), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const content = await targetResponse.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', targetResponse.headers.get('content-type') || 'text/html');
    res.status(200).send(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// api/flower.js (SERVERLESS FUNCTION - runs on Vercel server)
export default async function handler(req, res) {
  const { day } = req.query;
  const page = (parseInt(day, 10) % 50) + 1;

  const response = await fetch(`https://api.pexels.com/v1/search?query=flower&per_page=1&page=${page}`, {
    headers: {
      Authorization: process.env.YOUR_PEXELS_API_KEY
    }
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: 'Failed to fetch from Pexels' });
  }

  const data = await response.json();
  res.status(200).json(data);
}
